import httpService from "@/services/httpService";
import paymentService from "@/services/modules/payment/payment.service";
import { useEffect } from "react";

const PaymentError = () => {
  //!State
  const orderCode = httpService.getOrderCodeStorage();

  //!Function
  useEffect(() => {
    async function fetchData() {
      await paymentService.postGetPaymentFailed(orderCode || "");
    }

    fetchData();
  }, []);

  //!Render
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-2xl font-bold text-red-500">Payment Error</h1>
        <p className="text-gray-700 mt-4">
          We encountered an issue processing your payment.
        </p>

        <div className="mt-6">
          <p className="text-gray-500">
            Error Code: <span className="font-medium text-black">500</span>
          </p>
          <p className="text-gray-500 mt-2">
            Message: <span className="font-medium text-black">Error</span>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button
            // onClick={onRetry}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Retry Payment
          </button>

          <button
            // onClick={onContactSupport}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-4 py-2"
          >
            Contact Support
          </button>
        </div>
      </div>

      <footer className="text-gray-500 mt-6 text-sm">
        If the issue persists, please reach out to our support team for
        assistance.
      </footer>
    </div>
  );
};

export default PaymentError;
