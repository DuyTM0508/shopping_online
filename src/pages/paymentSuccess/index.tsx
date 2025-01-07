import OrderSummaries from "@/components/order/orderSummaries";
import httpService from "@/services/httpService";
import useGetListOrder from "@/services/modules/order/hooks/useGetListOrder";
import paymentService from "@/services/modules/payment/payment.service";
import { useEffect } from "react";
import data from "../../../public/data.json";
let orderProducts: any = [];

data.orders[0].products.forEach((productDetails) => {
  data.products.forEach((product) => {
    if (product.id == productDetails.id) {
      orderProducts.push(product);
    }
  });
});

const PaymentSuccess = () => {
  //!State
  const { data } = useGetListOrder();
  const orderCode = httpService.getOrderCodeStorage();
  //!Function
  useEffect(() => {
    async function fetchData() {
      await paymentService.postGetPaymentSuccess(orderCode || "");
    }
    fetchData();
  }, []);

  //!Render
  return (
    <div className="my-10 p-4">
      <div className="typo-2 mt-5 font-bold">Order Summaries</div>
      <OrderSummaries order={data} />
    </div>
  );
};

export default PaymentSuccess;
