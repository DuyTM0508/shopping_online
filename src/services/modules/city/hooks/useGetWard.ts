import { API_WARD_URL } from "@/consts/apiUrl";
import { showError } from "@/helpers/toast";
import { SelectOption } from "@/interfaces/common";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetWard = (districtId: string) => {
  const [listWard, setListWard] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWard = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_WARD_URL}${districtId}`);
      setListWard(
        response.data.map((item: any) => ({
          value: item.wardId,
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
    fetchWard();
  }, [districtId]);

  return { listWard, loading, fetchWard };
};

export default useGetWard;
