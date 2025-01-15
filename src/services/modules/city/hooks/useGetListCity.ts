import { API_CITY_URL } from "@/consts/apiUrl";
import { showError } from "@/helpers/toast";
import { SelectOption } from "@/interfaces/common";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetListCity = () => {
  const [listCity, setListCity] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchListCity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_CITY_URL);
      setListCity(
        response.data.map((item: any) => ({
          value: item.cityId,
          label: item.name,
        }))
      );
      setLoading(false);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListCity();
  }, []);

  return { listCity, loading };
};

export default useGetListCity;
