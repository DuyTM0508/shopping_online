import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Formik } from "formik";
import { Fragment } from "react";
import CommonIcons from "../commonIcons";
import { Button } from "../ui/button";

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
  const { isOpen, toggle, onSubmit } = props;
  //!State

  //!Function

  //!Render
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogOverlay>
        <DialogPortal>
          <DialogContent className="max-w-7xl sm:max-w-2xl lg:max-w-4xl">
            <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
              {({}) => {
                return (
                  <Fragment>
                    <DialogDescription className={"typo-13 font-normal"}>
                      <section className="dark:bg-gray-900 bg-white py-8 antialiased md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                          <h2 className="text-gray-900 text-xl font-semibold dark:text-white sm:text-2xl">
                            Shopping Cart
                          </h2>

                          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                              <div className="space-y-6">
                                <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg border bg-white p-4 shadow-sm md:p-6">
                                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <a href="#" className="shrink-0 md:order-1">
                                      <img
                                        className="h-20 w-20 dark:hidden"
                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                        alt="imac image"
                                      />
                                      <img
                                        className="hidden h-20 w-20 dark:block"
                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                        alt="imac image"
                                      />
                                    </a>

                                    <label className="sr-only">
                                      Choose quantity:
                                    </label>
                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                      <div className="flex items-center">
                                        <button
                                          type="button"
                                          id="decrement-button"
                                          data-input-counter-decrement="counter-input"
                                          className="border-gray-300 bg-gray-100 hover:bg-gray-200 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2"
                                        >
                                          <svg
                                            className="text-gray-900 h-2.5 w-2.5 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 2"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M1 1h16"
                                            />
                                          </svg>
                                        </button>
                                        <input
                                          type="text"
                                          id="counter-input"
                                          data-input-counter
                                          className="text-gray-900 w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 dark:text-white"
                                          placeholder=""
                                          value="2"
                                          required
                                        />
                                        <button
                                          type="button"
                                          id="increment-button"
                                          data-input-counter-increment="counter-input"
                                          className="border-gray-300 bg-gray-100 hover:bg-gray-200 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2"
                                        >
                                          <svg
                                            className="text-gray-900 h-2.5 w-2.5 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 18"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M9 1v16M1 9h16"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="text-end md:order-4 md:w-32">
                                        <p className="text-gray-900 text-base font-bold dark:text-white">
                                          $1,499
                                        </p>
                                      </div>
                                    </div>

                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                      <a
                                        href="#"
                                        className="text-gray-900 text-base font-medium hover:underline dark:text-white"
                                      >
                                        PC system All in One APPLE iMac (2023)
                                        mqrq3ro/a, Apple M3, 24" Retina 4.5K,
                                        8GB, SSD 256GB, 10-core GPU, Keyboard
                                        layout INT
                                      </a>

                                      <div className="flex items-center gap-4">
                                        <button
                                          type="button"
                                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                        >
                                          <CommonIcons.Trash
                                            className="h-4 w-4"
                                            color="currentColor"
                                          />
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                              <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 space-y-4 rounded-lg border bg-white p-4 shadow-sm sm:p-6">
                                <p className="text-gray-900 text-xl font-semibold dark:text-white">
                                  Order summary
                                </p>

                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                      <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                        Original price
                                      </dt>
                                      <dd className="text-gray-900 text-base font-medium dark:text-white">
                                        $7,592.00
                                      </dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                      <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                        Savings
                                      </dt>
                                      <dd className="text-base font-medium text-green-600">
                                        -$299.00
                                      </dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                      <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                        Store Pickup
                                      </dt>
                                      <dd className="text-gray-900 text-base font-medium dark:text-white">
                                        $99
                                      </dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                      <dt className="text-gray-500 dark:text-gray-400 text-base font-normal">
                                        Tax
                                      </dt>
                                      <dd className="text-gray-900 text-base font-medium dark:text-white">
                                        $799
                                      </dd>
                                    </dl>
                                  </div>

                                  <dl className="border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4 border-t pt-2">
                                    <dt className="text-gray-900 text-base font-bold dark:text-white">
                                      Total
                                    </dt>
                                    <dd className="text-gray-900 text-base font-bold dark:text-white">
                                      $8,191.00
                                    </dd>
                                  </dl>
                                </div>

                                <Button
                                  className="w-full"
                                  type="submit"
                                  variant={"primary"}
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
                );
              }}
            </Formik>
          </DialogContent>
        </DialogPortal>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogCart;
