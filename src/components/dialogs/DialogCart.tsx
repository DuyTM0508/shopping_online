import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { showSuccess } from "@/helpers/toast";
import { DialogI } from "@/interfaces/common";
import { useCartStore } from "@/stores/useStores";
import { Formik } from "formik";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import CommonIcons from "../commonIcons";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import useToggleDialog from "@/hooks/useToggleDialog";
import DialogCheckOut from "./DialogCheckOut";
import useGetListCart from "@/services/modules/cart/hooks/useGetListCart";
import httpService from "@/services/httpService";
import LoadingScreen from "../loadingScreen";

interface DialogCartProps extends DialogI<any> {
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

const DialogCart = (props: DialogCartProps) => {
  //!State
  const { isOpen, toggle } = props;
  // const dataCart = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [openCheckOut, toggleOpenCheckout, shouldRenderOpenCheckOut] =
    useToggleDialog();
  const sessionId = httpService.getSessionIdStorage();

  //!Function
  const { data, isLoading } = useGetListCart(sessionId);

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <Formik initialValues={{}} onSubmit={() => {}}>
                {({}) => {
                  return (
                    <ScrollArea className="max-h-[calc(80vh-4rem)]">
                      <Fragment>
                        {shouldRenderOpenCheckOut && (
                          <DialogCheckOut
                            isOpen={openCheckOut}
                            toggle={toggleOpenCheckout}
                            title={"Checkout Forms"}
                            variantYes={"destructive"}
                          />
                        )}
                        <DialogDescription className={"typo-13 font-normal"}>
                          <section className="dark:bg-gray-900 bg-white antialiased">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                              <div className="flex items-center justify-between">
                                <div className="text-gray-900 text-xl font-semibold dark:text-white sm:text-2xl">
                                  Shopping Cart
                                </div>
                                <Button
                                  className="font-semibold  hover:bg-black"
                                  variant="destructive"
                                  onClick={() => {
                                    clearCart();
                                    showSuccess("Clear all cart success");
                                  }}
                                  disabled={data?.length === 0}
                                >
                                  Clear All Cart
                                </Button>
                              </div>

                              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="flex w-full flex-col space-y-2 lg:w-2/3 lg:space-y-1">
                                  {data?.map((item, index) => (
                                    <div
                                      className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
                                      key={index}
                                    >
                                      <div className="space-y-6">
                                        <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg border bg-white p-4 shadow-sm md:p-6">
                                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <Link
                                              to="#"
                                              className="shrink-0 md:order-1"
                                            >
                                              <img
                                                className="h-20 w-20 dark:hidden"
                                                src={item?.Image}
                                              />
                                            </Link>

                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                              <div className="flex items-center">
                                                {item?.Quantity}
                                              </div>
                                              <div className="text-end md:order-4 md:w-32">
                                                <div className="text-gray-900 text-base font-bold dark:text-white">
                                                  $
                                                  {item?.Price?.toLocaleString()}
                                                </div>
                                              </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                              <Link
                                                to="#"
                                                className="text-gray-900 text-base font-medium hover:underline dark:text-white"
                                              >
                                                {item?.ProductName}
                                              </Link>

                                              <div className="flex max-w-[fit-content] items-center gap-1 hover:cursor-pointer hover:underline">
                                                <CommonIcons.Trash
                                                  className="h-4 w-4"
                                                  color="red"
                                                />
                                                <span
                                                  className="text-red-600"
                                                  onClick={() => {
                                                    removeItem(item.CartId);
                                                    showSuccess(
                                                      "Remove item success"
                                                    );
                                                  }}
                                                >
                                                  Remove
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                  <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 space-y-4 rounded-lg border bg-white p-4 shadow-sm sm:p-6">
                                    <div className="text-gray-900 text-xl font-semibold dark:text-white">
                                      Order summary
                                    </div>

                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                          <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                            Original price
                                          </dt>
                                          <dd className="text-gray-900 text-base font-medium dark:text-white">
                                            $
                                            {data
                                              ?.reduce(
                                                (total, item) =>
                                                  total + item.Price,
                                                0
                                              )
                                              .toLocaleString()}
                                          </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                          <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                            Savings
                                          </dt>
                                          <dd className="text-base font-medium text-green-600">
                                            $0
                                          </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                          <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                            Store Pickup
                                          </dt>
                                          <dd className="text-gray-900 text-base font-medium dark:text-white">
                                            $0
                                          </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                          <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                            Tax
                                          </dt>
                                          <dd className="text-gray-900 text-base font-medium dark:text-white">
                                            $0
                                          </dd>
                                        </dl>
                                      </div>

                                      <dl className="border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4 border-t pt-2">
                                        <dt className="text-gray-900 text-base font-bold dark:text-white">
                                          Total
                                        </dt>
                                        <dd className="text-gray-900 text-base font-bold dark:text-white">
                                          $
                                          {data
                                            ?.reduce(
                                              (total, item) =>
                                                total + item.Price,
                                              0
                                            )
                                            .toLocaleString()}
                                        </dd>
                                      </dl>
                                    </div>

                                    <Button
                                      className="w-full"
                                      type="submit"
                                      variant={"primary"}
                                      disabled={data?.length === 0}
                                    >
                                      Process to Checkout
                                    </Button>

                                    <div className="flex items-center justify-center gap-2">
                                      <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                                        or
                                      </span>
                                      <div
                                        onClick={toggle}
                                        className="text-primary-700 dark:text-primary-500 inline-flex items-center gap-2 text-sm font-medium underline hover:cursor-pointer hover:no-underline"
                                      >
                                        Continue Shopping
                                        <CommonIcons.ArrowRight
                                          className="h-4 w-4"
                                          color="currentColor"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </DialogDescription>
                      </Fragment>
                    </ScrollArea>
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

export default DialogCart;
