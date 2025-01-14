import BaseUrl from "@/consts/baseUrl";
import useToggleDialog from "@/hooks/useToggleDialog";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import DialogConfirm from "../dialogs/DialogConfirm";
import { Button } from "../ui/button";

interface Props {
  handleAddToCart: () => void;
}

const AddToCartForm = ({ handleAddToCart }: Props) => {
  //!State
  const navigation = useNavigate();
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();

  //!Function

  //!Render
  return (
    <Formik
      initialValues={{
        quantity: 1,
      }}
      onSubmit={handleAddToCart}
      validationSchema={Yup.object().shape({})}
    >
      {({}) => {
        return (
          <div className="component:AddToCartForm">
            {shouldRenderAskLogin && (
              <DialogConfirm
                isOpen={openAskLogin}
                toggle={toggleAskLogin}
                title={"Login"}
                content={"You need to login to shop"}
                variantYes={"destructive"}
                onSubmit={() => navigation(BaseUrl.Login)}
              />
            )}
            <Form>
              <Button
                className="mt-4 rounded-md bg-black px-6 py-2 text-lg text-white"
                variant={"destructive"}
                type="submit"
              >
                Add to cart
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddToCartForm;
