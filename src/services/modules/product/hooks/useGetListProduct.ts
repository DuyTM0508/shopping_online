import { convertParamFilter } from "@/helpers/common";
import { showError } from "@/helpers/toast";
import { useSave } from "@/stores/useStores";
import { flatten, isArray } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IProductRequest,
  ProductList,
  ResponseGetListProduct,
} from "../interfaces/product";
import productService from "../productService";
import cachedKeys from "@/consts/cachedKeys";

/********************************************************
 * SNIPPET GENERATED
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 ********************************************************/

//* Check parse body request
const parseRequest = (filters?: IProductRequest) => {
  return cloneDeep({
    PageSize: filters?.PageSize || 50,
    CurrentPage: filters?.CurrentPage || 1,
    TextSearch: filters?.TextSearch || "",
    Status: filters?.Status || 0,
    Category: filters?.Category || "",
    MinPrice: filters?.MinPrice || null,
    MaxPrice: filters?.MaxPrice || null,
    SortColumn: filters?.SortColumn || "",
    SortDirection: filters?.SortDirection || "",
  });
};

const requestAPI = productService.getProductList;

const useGetListProduct = (
  filters: IProductRequest,
  options: {
    isTrigger?: boolean;
    refetchKey?: string;
    isLoadmore?: boolean;
    saveData?: boolean;
  } = {
    isTrigger: true,
    refetchKey: "",
    isLoadmore: false,
    saveData: true,
  }
) => {
  //! State
  const { isTrigger = true, refetchKey = "", saveData = true } = options;
  const signal = useRef(new AbortController());
  const save = useSave();
  const [data, setData] = useState<ProductList[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseGetListProduct> | undefined =
    useCallback(() => {
      if (!isTrigger) {
        return;
      }

      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const nextFilters: IProductRequest = convertParamFilter(
              parseRequest,
              filters
            ) as IProductRequest;
            const response = await requestAPI(nextFilters, {
              signal: signal.current.signal,
            });
            resolve(response);
          } catch (error) {
            setError(error);
            reject(error);
          }
        })();
      });
    }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (
      response: ResponseGetListProduct,
      options: { isLoadmore?: boolean } = {}
    ) => {
      const { isLoadmore } = options;

      //* Check condition of response here to set data
      if (saveData) {
        setTotalPage(response.data.Object.PageSize);
        setTotal(response?.data?.Object.Total);
        save(cachedKeys.totalPageCount, response.data.Object.PageSize);
        save(cachedKeys.totalProductCount, response?.data?.Object.Total);
      }

      //* Check condition of response here to set data
      if (isArray(response?.data?.Object.ProductList)) {
        if (isLoadmore) {
          setData((prev) => {
            if (filters.CurrentPage === 1) {
              return response?.data?.Object.ProductList;
            }
            return [...prev, ...(response?.data?.Object.ProductList || [])];
          });
        } else {
          setData(response?.data?.Object.ProductList);
          //   if (saveData) {
          //     save(cachedKeys.dataDriver, response?.data?.data);
          //   }
        }

        setHasMore(
          response?.data?.Object.CurrentPage < response?.data?.Object.PageSize
        );
      }
    },
    [filters.CurrentPage, save, saveData]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      if (signal.current) {
        signal.current.abort();
        signal.current = new AbortController();
      }

      setRefetching(true);
      const page = filters?.CurrentPage || 1;

      let listRequest: Promise<ResponseGetListProduct>[] = [];
      for (let eachPage = 0; eachPage < page; eachPage++) {
        const nextFilters = parseRequest(filters);
        nextFilters.CurrentPage = eachPage;

        const request = requestAPI(nextFilters);

        listRequest = [...listRequest, request];
      }

      const responses = await Promise.allSettled(listRequest);
      const allData = responses.map((el) => {
        if (el.status === "fulfilled") {
          setHasMore(
            el?.value?.data?.Object.CurrentPage <
              el?.value?.data?.Object.PageSize
          );

          return isArray(el?.value?.data) ? el?.value?.data : [];
        }

        return [];
      });
      setData(flatten(allData));
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  useEffect(() => {
    signal.current = new AbortController();

    //* Fetch initial API
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const response = await fetch();
        if (response) {
          checkConditionPass(response);
          setLoading(false);
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    //* Fetch more API
    const fetchMore = async () => {
      try {
        setLoadingMore(true);
        const response = await fetch();
        if (response) {
          checkConditionPass(response, { isLoadmore: options.isLoadmore });
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoadingMore(false);
      }
    };

    if (filters.CurrentPage !== undefined && filters.CurrentPage <= 1) {
      fetchAPI();
    } else {
      //* If page / offset > 0 -> fetch more
      fetchMore();
    }

    return () => {
      if (signal.current) {
        signal.current.abort();
      }
    };
  }, [filters.CurrentPage, fetch, checkConditionPass, options.isLoadmore]);

  return {
    data,
    total,
    totalPage,
    loading,
    error,
    refetch,
    refetching,
    loadingMore,
    hasMore,
    setData,
    fetch,
  };
};

export default useGetListProduct;
