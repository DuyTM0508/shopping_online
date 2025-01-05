import {
  ADD_TO_CART_URL,
  CART_URL_ID,
  GET_CART_URL,
  REMOVE_ALL_CART_URL,
  REMOVE_CART_URL,
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
  postRemoveCart(cartID: string) {
    return httpService.post(`${REMOVE_CART_URL}?cartID=${cartID}`, null);
  }
  postRemoveAllCart(sessionID: string) {
    return httpService.post(
      `${REMOVE_ALL_CART_URL}?sessionId=${sessionID}`,
      null
    );
  }
}

export default new CartService();
