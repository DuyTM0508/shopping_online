import { showError } from "@/helpers/toast";
import { useCallback, useEffect, useState } from "react";
import cartService from "../cartService";
import { Cart } from "../interfaces/cart";

const useGetListCart = (id: string) => {
  //!State
  const [data, setData] = useState<Cart[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  //!Function
  const fetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await cartService.getListCart(id);
        setData(response?.data.Object?.cart);
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, [id]);

  const refetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await cartService.getListCart(id);
        setData(response?.data.Object?.cart);
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, [id]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const response = await fetch();
        if (response) {
          setLoading(false);
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [fetch]);

  //!Render
  return { data, isLoading, error, refetch };
};

export default useGetListCart;
