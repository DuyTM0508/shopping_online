import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import data from "../../../public/data.json";

interface DialogCheckOutProps extends DialogI<any> {
  title: React.ReactNode;
  titleButtonConfirm?: string;
  titleButtonCancel?: string;
  variantYes?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "primary"
    | null
    | undefined;
}

let cartItems = [];
data.shoppingCart.map((id) =>
  data.products.filter((x) => x.id == id).map((x) => cartItems.push(x))
);

const DialogCheckOut = (props: DialogCheckOutProps) => {
  //!State
  const { isOpen, toggle, title } = props;

  //!Function

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-lg">
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ isSubmitting }) => {
                return (
                  <Fragment>
                    {title && (
                      <DialogTitle className={"typo-7"}>{title}</DialogTitle>
                    )}
                    <Form>
                      <DialogDescription className={"typo-13 font-normal"}>
                        {content}
                      </DialogDescription>
                    </Form>
                  </Fragment>
                );
              }}
            </Formik>
          </DialogContent>
        </DialogPortal>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogCheckOut;
