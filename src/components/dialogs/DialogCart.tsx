import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showError, showSuccess } from "@/helpers/toast";
import useToggleDialog from "@/hooks/useToggleDialog";
import { DialogI } from "@/interfaces/common";
import httpService from "@/services/httpService";
import useGetListCart from "@/services/modules/cart/hooks/useGetListCart";
import { useCartStore } from "@/stores/useStores";
import { ArrowRight, Trash2, X } from "lucide-react";
import LoadingScreen from "../loadingScreen";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import DialogCheckOut from "./DialogCheckOut";
import cartService from "@/services/modules/cart/cartService";

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
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [openCheckOut, toggleOpenCheckout, shouldRenderOpenCheckOut] =
    useToggleDialog();
  const sessionId = httpService.getSessionIdStorage();
  const { data, isLoading, refetch } = useGetListCart(sessionId);

  //!Function

  //!Render
  const total = data.reduce((sum, item) => sum + item.Price, 0);

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="h-[90vh] max-w-4xl p-0 sm:max-w-[800px]">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <DialogHeader className="sticky top-0 z-10 border-b bg-white px-6 py-4">
              {shouldRenderOpenCheckOut && (
                <DialogCheckOut
                  isOpen={openCheckOut}
                  toggle={toggleOpenCheckout}
                  title="Checkout"
                  variantYes="destructive"
                  data={data}
                  refetchCart={refetch}
                />
              )}
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-semibold">
                  Shopping Cart
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      try {
                        await cartService.postRemoveAllCart(sessionId);
                        clearCart();
                        showSuccess("Cart cleared");
                        refetch();
                      } catch (error) {
                        showError("Failed to clear cart");
                      }
                    }}
                    disabled={data.length === 0}
                    className="text-sm"
                  >
                    Clear All Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="h-[calc(90vh-180px)] px-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
                <div className="flex-1 space-y-4">
                  {data.map((item) => (
                    <Card key={item.CartId} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.Image || "/placeholder.svg"}
                              alt={item.ProductName}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {item.ProductName}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Quantity: {item.Quantity}
                                </p>
                              </div>
                              <p className="text-base font-medium text-gray-900">
                                {item.Price.toLocaleString()} VND
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto self-start p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={async () => {
                                try {
                                  await cartService.postRemoveCart(item.CartId);
                                  removeItem(item.CartId);
                                  showSuccess("Item removed");
                                  refetch();
                                } catch (error) {
                                  showError("Failed to remove item");
                                }
                              }}
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 lg:mt-0 lg:w-[380px]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Order summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Original price</span>
                          <span>{total.toLocaleString()} VND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Savings</span>
                          <span className="text-green-600">0 VND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Store Pickup</span>
                          <span>0 VND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tax</span>
                          <span>0 VND</span>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{total.toLocaleString()} VND</span>
                        </div>
                      </div>

                      <Button
                        className="mt-6 w-full"
                        size="lg"
                        onClick={toggleOpenCheckout}
                        disabled={data.length === 0}
                      >
                        Process to Checkout
                      </Button>

                      <div className="mt-4 space-x-2 text-center text-sm">
                        <span className="text-gray-500">or</span>
                        <button
                          onClick={toggle}
                          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700"
                        >
                          Continue Shopping
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogCart;
