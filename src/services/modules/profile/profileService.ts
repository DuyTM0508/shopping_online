import { USER_URL } from "@/consts/apiUrl";
import httpService from "@/services/httpService";

class ProfileService {
  getProfile() {
    return httpService.get(`${USER_URL}/GetUserInformation`);
  }
  updateProfile(body: FormData) {
    return httpService.post(`${USER_URL}/UpdateProfile`, body);
  }
}

export default new ProfileService();
