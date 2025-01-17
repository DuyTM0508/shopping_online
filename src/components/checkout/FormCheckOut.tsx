import { getFromStorage } from "@/helpers/common";
import { showError } from "@/helpers/toast";
import httpService, { USER_KEY } from "@/services/httpService";
import { Cart } from "@/services/modules/cart/interfaces/cart";
import useGetDistrict from "@/services/modules/city/hooks/useGetDistrict";
import useGetListCity from "@/services/modules/city/hooks/useGetListCity";
import useGetWard from "@/services/modules/city/hooks/useGetWard";
import orderService from "@/services/modules/order/order.service";
import { useCartStore } from "@/stores/useStores";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CommonIcons from "../commonIcons";
import FormikField from "../customFieldsFormik/FormikField";
import InputField from "../customFieldsFormik/InputField";
import { Button } from "../ui/button";

export interface IFormCheckOut {
  OrderCode: number;
  Address: string;
  city?: string;
  state?: string;
  Type: number;
}

interface Props {
  data: Cart[];
  toggle: () => void;
  refetchCart?: () => void;
}

const FormCheckOut = ({ data, refetchCart, toggle }: Props) => {
  //!State
  const dataUser = getFromStorage(USER_KEY);
  const userInfo = JSON.parse(dataUser?.data || "");

  const formatProvinceId = userInfo?.ProvinceID.toString().padStart(2, "0");
  const formatDistrictId = userInfo?.DistrictID.toString().padStart(3, "0");
  const formatWardId = userInfo?.WardID.toString().padStart(5, "0");

  const { listCity } = useGetListCity();
  const { listDistrict } = useGetDistrict(formatProvinceId);
  const { listWard } = useGetWard(formatDistrictId);

  const initialValues = {
    OrderCode: Math.floor(100000 + Math.random() * 900000),
    Address: "",
    ProvinceID: listCity?.find((item) => item.value === formatProvinceId)
      ?.label,
    DistrictID: listDistrict?.find((item) => item.value === formatDistrictId)
      ?.label,
    WardID: listWard?.find((item) => item.value === formatWardId)?.label,
    Type: 1,
  };

  const token = httpService.getTokenStorage();
  const validationSchema = Yup.object().shape({
    Address: Yup.string().required("Address is required"),
  });
  const clearCart = useCartStore((state) => state.clearCart);

  //!Function
  const handleCheckOut = async (values: IFormCheckOut) => {
    try {
      const payload = {
        OrderCode: values.OrderCode,
        Address: values.Address,
        Type: values.Type,
        listCart: data?.map((item) => item?.CartId),
      };
      if (payload) {
        httpService.saveOrderCodeStorage(payload.OrderCode.toString());
        httpService.attachTokenToHeader(token);
        const response = await orderService.postCheckOut(payload);
        window.alert("Checkout successful! Click OK to proceed to payment.");

        window.open(response.data.Object, "_blank");

        refetchCart?.();
        clearCart();
        toggle();
      }
    } catch (error) {
      showError("Order failed");
    }
  };

  //!Render
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleCheckOut}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({}) => {
          return (
            <Form>
              <div className="p-7">
                <div>
                  <div className="typo-1 mb-4">Order code</div>
                  <div>
                    <FormikField
                      component={InputField}
                      name="OrderCode"
                      label="Code"
                      disabled
                      iconText="#"
                      isIcon
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="typo-1 mb-4">Shipping address</div>
                  <div className="">
                    <FormikField
                      required
                      component={InputField}
                      name="Address"
                      label="Address Detail"
                      placeholder="Enter your address detail"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <FormikField
                        component={InputField}
                        name="ProvinceID"
                        label="Province"
                        placeholder="Enter your province"
                        disabled
                      />
                    </div>
                    <div>
                      <FormikField
                        component={InputField}
                        name="DistrictID"
                        label="District"
                        placeholder="Enter your district"
                        disabled
                      />
                    </div>
                    <div>
                      <FormikField
                        component={InputField}
                        name="WardID"
                        label="Ward"
                        placeholder="Your postal ward"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Ensure <hr> is not mistakenly wrapped */}
                  <div className="mt-10">
                    <hr className="mb-4 bg-black" />
                  </div>

                  <div className="float-end mt-4">
                    <Button className="max-h-10 gap-1" type="submit">
                      <CommonIcons.CreditCard />
                      Process to payment
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormCheckOut;
