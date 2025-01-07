import { showError } from "@/helpers/toast";
import { useCallback, useEffect, useState } from "react";
import { OrderList } from "../interfaces/order.interface";
import orderService from "../order.service";
import httpService from "@/services/httpService";

const useGetListOrder = () => {
  //!State
  const [data, setData] = useState<OrderList[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const token = httpService.getTokenStorage();

  //!Function
  const fetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        httpService.attachTokenToHeader(token);
        const response = await orderService.getListOrder();
        setData(response?.data.Object?.OrderList);
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, []);

  const refetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await orderService.getListOrder();
        setData(response?.data.Object?.OrderList);
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, []);

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

export default useGetListOrder;
