import {
  ADD_TO_CART_URL,
  CART_URL_ID,
  GET_CART_URL,
  START_SESSION_URL,
} from "@/consts/apiUrl";
import httpService from "@/services/httpService";

class CartService {
  postStartSession() {
    return httpService.post(START_SESSION_URL, null);
  }
  getSessionId() {
    return httpService.get(`${CART_URL_ID}`);
  }
  postAddToCart(SessionID: string, ProductID: string) {
    return httpService.post(`${ADD_TO_CART_URL}`, { SessionID, ProductID });
  }
  getListCart(SessionID: string) {
    return httpService.get(`${GET_CART_URL}?sessionId=${SessionID}`);
  }
}

export default new CartService();
