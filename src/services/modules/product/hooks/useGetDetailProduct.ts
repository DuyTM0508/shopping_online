import { useRef, useEffect, useState, useCallback } from "react";
import { isEmpty } from "lodash";
import { useSave } from "@/stores/useStores";

import { showError } from "@/helpers/toast";
import { ProductDetail, ResponseGetDetailProduct } from "../interfaces/product";
import productService from "../productService";
import { errorHandler } from "@/helpers/errors";

/**
 * Please check:
 * - fetch()
 * - refetch()
 * - checkConditionPass()
 */
const useGetDetailProduct = (
  id: string,
  options: { isTrigger?: boolean; cachedKey?: string } = {
    isTrigger: true,
    cachedKey: "",
  }
) => {
  //! State
  const signal = useRef(new AbortController());
  const { isTrigger = true, cachedKey = "" } = options;

  const save = useSave();
  const [data, setData] = useState<ProductDetail>();
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [error, setError] = useState<unknown>(null);

  //! Function
  const fetch: () => Promise<ResponseGetDetailProduct> | undefined =
    useCallback(() => {
      if (!isTrigger) {
        return;
      }

      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await productService.getProductDetail(id);
            resolve(response);
          } catch (error) {
            setError(error);
            reject(error);
          }
        })();
      });
    }, [id, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseGetDetailProduct) => {
      //* Check condition of response here to set data
      if (!isEmpty(response?.data?.Object)) {
        setData(response.data?.Object);
        save("detailDataRoute", response.data?.Object);
      }
    },
    [save]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      signal.current = new AbortController();
      const response = await productService.getProductDetail(id);
      checkConditionPass(response);
    } catch (error: any) {
      showError(errorHandler(error));
    } finally {
      setRefetching(false);
    }
  }, [checkConditionPass, id]);

  useEffect(() => {
    if (cachedKey) {
      save(cachedKey, { refetch, data, isLoading, isRefetching });
    }
  }, [save, cachedKey, refetch, data, isLoading, isRefetching]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData: boolean) => {
      try {
        setLoading(true);
        signal.current = new AbortController();
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    signal.current = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      shouldSetData = false;
      signal.current.abort();
    };
  }, [fetch, checkConditionPass]);

  return {
    data,
    isLoading,
    error,
    refetch,
    refetchWithLoading,
    isRefetching,
    setData,
  };
};

export default useGetDetailProduct;
