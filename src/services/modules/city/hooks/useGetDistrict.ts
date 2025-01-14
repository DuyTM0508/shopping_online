import { API_DISTRICT_URL } from "@/consts/apiUrl";
import { showError } from "@/helpers/toast";
import { SelectOption } from "@/interfaces/common";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetDistrict = (cityId: string) => {
  const [listDistrict, setListDistrict] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchListDistrict = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_DISTRICT_URL}${cityId}`);
      setListDistrict(
        response.data.map((item: any) => ({
          value: item.districtId,
          label: item.name,
        }))
      );
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListDistrict();
  }, [cityId]);

  return { listDistrict, loading };
};

export default useGetDistrict;
