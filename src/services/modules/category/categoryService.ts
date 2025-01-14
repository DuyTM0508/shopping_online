import { CATEGORY_URL } from "@/consts/apiUrl";
import httpService from "@/services/httpService";

class categoryService {
  getCategory() {
    return httpService.get(`${CATEGORY_URL}/GetListCategory`);
  }
}

export default new categoryService();
