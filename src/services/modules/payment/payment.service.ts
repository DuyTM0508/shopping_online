import { PAYMENT_FAILED_URL, PAYMENT_SUCCESS_URL } from "@/consts/apiUrl";
import httpService from "@/services/httpService";

class PaymentService {
  postGetPaymentSuccess(orderCode: string | number) {
    return httpService.post(
      `${PAYMENT_SUCCESS_URL}?orderCode=${orderCode}`,
      null
    );
  }

  postGetPaymentFailed(orderCode: string | number) {
    return httpService.post(
      `${PAYMENT_FAILED_URL}?orderCode=${orderCode}`,
      null
    );
  }
}

export default new PaymentService();
