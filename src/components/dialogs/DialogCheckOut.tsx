import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Cart } from "@/services/modules/cart/interfaces/cart";
import { Fragment } from "react";
import FormCheckOut from "../checkout/FormCheckOut";
import BillingInfo from "../checkout/BillingInfo";
import { ScrollArea } from "../ui/scroll-area";

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
  data: Cart[];
  refetchCart?: () => void;
}

const DialogCheckOut = (props: DialogCheckOutProps) => {
  //!State
  const { isOpen, toggle, title, data, refetchCart } = props;

  //!Function

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-7xl">
            <Fragment>
              {title && <DialogTitle className={"typo-7"}>{title}</DialogTitle>}
              <DialogDescription className={"typo-13 font-normal"}>
                <div className="grid grid-cols-2 bg-neutral-100 text-black">
                  <FormCheckOut
                    data={data}
                    toggle={toggle}
                    refetchCart={refetchCart}
                  />

                  <ScrollArea className="max-h-[calc(80vh-4rem)]">
                    <BillingInfo data={data} />
                  </ScrollArea>
                </div>
              </DialogDescription>
            </Fragment>
          </DialogContent>
        </DialogPortal>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogCheckOut;
