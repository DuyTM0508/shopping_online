import { LOGIN_URL } from "@/consts/apiUrl";
import { ResponseCommon } from "@/interfaces/common";
import httpService from "@/services/httpService";
import { AxiosRequestConfig } from "axios";
import { ILoginRequest, ILoginResponse } from "./interfaces/login";

class AuthenticationService {
  postLogin(
    data: ILoginRequest,
    configs?: AxiosRequestConfig
  ): Promise<ResponseCommon<{ Object: ILoginResponse }>> {
    return httpService.post(LOGIN_URL, data, configs);
  }
}

export default new AuthenticationService();
