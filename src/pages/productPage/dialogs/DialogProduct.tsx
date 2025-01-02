import DialogConfirm from "@/components/dialogs/DialogConfirm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import BaseUrl from "@/consts/baseUrl";
import useToggleDialog from "@/hooks/useToggleDialog";
import { DialogI } from "@/interfaces/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import { Formik } from "formik";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductGallery from "../../../components/product/productGallery";
import ProductRating from "../../../components/product/productRating";
import { Button } from "../../../components/ui/button";

interface DialogProductProps extends DialogI<any> {
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
  detailId: string;
}

const DialogProduct = (props: DialogProductProps) => {
  const { isLogged } = useAuth();
  const {
    isOpen,
    toggle,
    onSubmit,
    title,
    variantYes,
    titleButtonConfirm,
    titleButtonCancel,
    detailId,
  } = props;
  //!State
  const { data: detailProduct, isLoading } = useGetDetailProduct(detailId, {
    isTrigger: !!detailId,
  });
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();
  const navigation = useNavigate();

  //!Function
  const handleAskLogin = () => {
    if (!isLogged) {
      toggleAskLogin();
      return;
    }
  };

  if (isLoading) return <div>Loading...</div>;

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-7xl">
            <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
              {({ isSubmitting }) => {
                return (
                  <Fragment>
                    {title && (
                      <DialogTitle className={"typo-7"}>{title}</DialogTitle>
                    )}
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
                    <DialogDescription className={"typo-13 font-normal"}>
                      <div className="component:DetailProduct container mx-auto p-6">
                        <div className="flex flex-wrap lg:flex-nowrap">
                          <ProductGallery
                            images={detailProduct?.FileList}
                            defaultImage={detailProduct?.Image}
                          />

                          <div className="w-full lg:w-1/2 lg:pl-6">
                            <h2 className="mt-4 text-2xl font-semibold">
                              {detailProduct?.Name}
                            </h2>
                            <p className="text-gray-700 mb-5">
                              {detailProduct?.Description}
                            </p>

                            <div className="flex items-center">
                              <h3 className="text-lg font-medium">
                                ${detailProduct?.Price.toLocaleString()}
                              </h3>
                              <input
                                className="hidden"
                                defaultValue={detailProduct?.Price}
                              />
                            </div>

                            <>
                              <h3 className="sr-only">Reviews</h3>
                              <div className="mt-3 flex items-center">
                                <ProductRating rating={detailProduct?.Rating} />
                                <span className="text-gray-600 ml-3">
                                  {detailProduct?.Reviews} reviews
                                </span>
                              </div>
                            </>

                            <div className="mt-6 flex flex-col gap-3">
                              <Button
                                className="typo-13 px-4 py-3 font-semibold text-white"
                                variant={variantYes}
                                isLoading={isSubmitting}
                                onClick={handleAskLogin}
                              >
                                {titleButtonConfirm || "Confirm"}
                              </Button>
                              <Button
                                className="typo-13 bg-black px-4 py-3 font-semibold text-white"
                                variant="primary"
                                type="button"
                                onClick={toggle}
                              >
                                {titleButtonCancel || "Cancel"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
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

export default DialogProduct;
