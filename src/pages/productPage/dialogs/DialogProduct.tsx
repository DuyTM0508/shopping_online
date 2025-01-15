import DialogConfirm from "@/components/dialogs/DialogConfirm";
import LoadingScreen from "@/components/loadingScreen";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import BaseUrl from "@/consts/baseUrl";
import { showError, showSuccess } from "@/helpers/toast";
import useToggleDialog from "@/hooks/useToggleDialog";
import { DialogI } from "@/interfaces/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import httpService from "@/services/httpService";
import cartService from "@/services/modules/cart/cartService";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ProductGallery from "../../../components/product/productGallery";
import ProductRating from "../../../components/product/productRating";
import { Button } from "../../../components/ui/button";
import { useCartStore } from "@/stores/useStores";

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
  const sessionId = httpService.getSessionIdStorage();
  const addToCart = useCartStore((state) => state.addItem);

  //!Function
  const handleAddToCart = async () => {
    if (!isLogged) {
      toggleAskLogin();
    } else {
      if (detailProduct && !useCartStore.getState().itemExists(detailId)) {
        await cartService.postAddToCart(sessionId, detailId);
        addToCart(detailProduct);
        showSuccess("Add to cart successfully");
      } else {
        showError("Item already exists in cart");
      }
    }
  };

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-3xl lg:max-w-6xl xl:max-w-7xl">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <Formik
                initialValues={{ quantity: 1 }}
                onSubmit={handleAddToCart}
                enableReinitialize
              >
                {({}) => {
                  return (
                    <Form>
                      <Fragment>
                        {/* {title && (
                          <DialogTitle className={"typo-7"}>
                            {title}
                          </DialogTitle>
                        )} */}
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
                          <div className="component:DetailProduct div-6 container mx-auto">
                            <div className="flex flex-wrap lg:flex-nowrap">
                              <ProductGallery
                                images={detailProduct?.FileList}
                                defaultImage={detailProduct?.Image || ""}
                              />

                              <div className="w-full lg:w-1/2 lg:pl-6">
                                <div className="mt-4 text-2xl font-semibold">
                                  {detailProduct?.Name}
                                </div>
                                <div className="mb-5 text-gray-700">
                                  {detailProduct?.Description}
                                </div>

                                <div className="flex items-center">
                                  <div className="text-lg font-medium">
                                    ${detailProduct?.Price.toLocaleString()}
                                  </div>
                                  <input
                                    className="hidden"
                                    defaultValue={detailProduct?.Price}
                                  />
                                </div>

                                <>
                                  <div className="sr-only">Reviews</div>
                                  <div className="mt-3 flex items-center">
                                    <ProductRating
                                      rating={detailProduct?.Rating}
                                    />
                                    <span className="ml-3 text-gray-600">
                                      {detailProduct?.Reviews} reviews
                                    </span>
                                  </div>
                                </>

                                <div className="mt-6 flex flex-col gap-3">
                                  <Button
                                    className="typo-13 px-4 py-3 font-semibold text-white"
                                    variant={variantYes}
                                    type="submit"
                                  >
                                    {titleButtonConfirm || "Confirm"}
                                  </Button>
                                  <Button
                                    className="typo-13 bg-black px-4 py-3 font-semibold text-white"
                                    variant="primary"
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
                    </Form>
                  );
                }}
              </Formik>
            )}
          </DialogContent>
        </DialogPortal>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogProduct;
