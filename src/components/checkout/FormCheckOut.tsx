import { showError } from "@/helpers/toast";
import httpService from "@/services/httpService";
import { Cart } from "@/services/modules/cart/interfaces/cart";
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
  const initialValues = {
    OrderCode: Math.floor(Math.random() * 1000000),
    Address: "",
    city: "",
    state: "",
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
                      label="Address"
                      placeholder="Street, no"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <FormikField
                        component={InputField}
                        name="city"
                        label="City"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <FormikField
                        component={InputField}
                        name="state"
                        label="State"
                        placeholder="Enter your country"
                      />
                    </div>
                    <div>
                      <FormikField
                        component={InputField}
                        name="code"
                        label="Postal code"
                        placeholder="Your postal code"
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
