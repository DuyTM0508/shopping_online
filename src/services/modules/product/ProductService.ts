import { PRODUCT_URL } from "@/consts/apiUrl";
import httpService from "@/services/httpService";
import { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { IProductRequest, ResponseGetListProduct } from "./interfaces/product";

class ProductService {
  getProductList(
    filter: IProductRequest,
    config?: AxiosRequestConfig
  ): Promise<ResponseGetListProduct> {
    return httpService.post(
      `${PRODUCT_URL}/?${queryString.stringify(filter)}`,
      config
    );
  }
}

export default new ProductService();
