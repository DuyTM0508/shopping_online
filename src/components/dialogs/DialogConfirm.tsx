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
import { Button } from "../ui/button";

interface DialogConfirmProps extends DialogI<any> {
  title: React.ReactNode;
  content: React.ReactNode;
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

const DialogConfirm = (props: DialogConfirmProps) => {
  const {
    isOpen,
    toggle,
    onSubmit,
    title,
    content,
    variantYes,
    titleButtonConfirm,
    titleButtonCancel,
  } = props;

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-2xl">
            <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
              {({ isSubmitting }) => {
                return (
                  <Fragment>
                    {title && (
                      <DialogTitle className={"typo-7"}>{title}</DialogTitle>
                    )}
                    {content && (
                      <DialogDescription className={"typo-13 font-normal"}>
                        {content}
                      </DialogDescription>
                    )}

                    <Form className="mt-[25px] flex justify-center gap-10">
                      <Button
                        className="typo-13 px-4 py-3 font-semibold text-text-sevent"
                        variant="ghost"
                        type="button"
                        onClick={toggle}
                      >
                        {titleButtonCancel || "Cancel"}
                      </Button>
                      <Button
                        type="submit"
                        className="typo-13 px-4 py-3 font-semibold text-white"
                        variant={variantYes}
                        isLoading={isSubmitting}
                      >
                        {titleButtonConfirm || "Confirm"}
                      </Button>
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

export default DialogConfirm;
