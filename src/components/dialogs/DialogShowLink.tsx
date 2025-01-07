import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Fragment } from "react";

interface DialogShowLinkProps extends DialogI<any> {
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

const DialogShowLink = (props: DialogShowLinkProps) => {
  //!State
  const { isOpen, toggle, title, content } = props;

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
                {content}
              </DialogDescription>
            </Fragment>
          </DialogContent>
        </DialogPortal>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogShowLink;
