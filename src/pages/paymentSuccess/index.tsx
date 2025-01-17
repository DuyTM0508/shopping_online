import { DateTimeFormat } from "@/components/consts/dates";
import OrderCardProduct from "@/components/order/orderCardProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import httpService from "@/services/httpService";
import useGetListOrder from "@/services/modules/order/hooks/useGetListOrder";
import paymentService from "@/services/modules/payment/payment.service";
import { FileText } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { data = [] } = useGetListOrder();
  const orderCode = httpService.getOrderCodeStorage();

  useEffect(() => {
    async function fetchData() {
      await paymentService.postGetPaymentSuccess(orderCode || "");
    }
    fetchData();
  }, [orderCode]);

  //!Render
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Order Summaries
      </h1>
      <div className="space-y-6">
        {data.map((order, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">
                    Order #{order.OrderCode}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Order placed:{" "}
                    <span className="font-medium text-foreground">
                      {moment(order.CreatedDate).format(
                        DateTimeFormat.FullDate
                      )}
                    </span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Invoice
                </Button>
              </div>

              <OrderCardProduct
                status={order.Status}
                address={order.Address}
                email={order.Email}
                phoneNumber={order.PhoneNumber}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentSuccess;
