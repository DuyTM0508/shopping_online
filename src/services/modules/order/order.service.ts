import { IFormCheckOut } from "@/components/checkout/FormCheckOut";
import { LIST_ORDER_URL, ORDER_URL } from "@/consts/apiUrl";
import httpService from "@/services/httpService";

class orderService {
  postCheckOut(body: IFormCheckOut) {
    return httpService.post(`${ORDER_URL}/Checkout`, body);
  }

  getListOrder() {
    return httpService.get(`${LIST_ORDER_URL}`);
  }
}

export default new orderService();
