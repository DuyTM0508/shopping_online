import {
  ADD_NEW_PRODUCT_URL,
  PRODUCT_DETAIL_URL,
  PRODUCT_URL,
  UPDATE_PRODUCT_URL,
} from "@/consts/apiUrl";
import httpService from "@/services/httpService";
import { AxiosRequestConfig } from "axios";
import { IProductRequest, ResponseGetListProduct } from "./interfaces/product";

class ProductService {
  getProductList(
    filter: IProductRequest,
    config?: AxiosRequestConfig
  ): Promise<ResponseGetListProduct> {
    return httpService.post(`${PRODUCT_URL}`, filter, config);
  }

  getProductDetail(id: string | number, config?: AxiosRequestConfig) {
    return httpService.get(`${PRODUCT_DETAIL_URL}?id=${id}`, config);
  }

  postAddNewProduct(data: FormData) {
    return httpService.post(`${ADD_NEW_PRODUCT_URL}`, data);
  }

  postUpdateProduct(id: String | number, data: FormData) {
    return httpService.post(`${UPDATE_PRODUCT_URL}?id=${id}`, data);
  }
}

export default new ProductService();
