import { showError } from "@/helpers/toast";
import { useEffect, useState } from "react";
import categoryService from "../categoryService";
import { IListCategory } from "../interfaces/category.interface";
import httpService from "@/services/httpService";

const useGetCateGory = () => {
  const token = httpService.getTokenStorage();
  const [category, setCategory] = useState<IListCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      httpService.attachTokenToHeader(token);
      const response = await categoryService.getCategory();
      setCategory(response.data.Object);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return { category, fetchCategory, loading };
};

export default useGetCateGory;
