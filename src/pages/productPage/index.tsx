import LoadingScreen from "@/components/loadingScreen";
import EnhancedDataNotFound from "@/components/notfound/EnhancedDataNotFound";
import PageListHeader, {
  IValueFormPageHeader,
} from "@/components/pageHeader/PageListHeader";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import CardProduct from "@/components/product/cardProduct";
import cachedKeys from "@/consts/cachedKeys";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetListProduct from "@/services/modules/product/hooks/useGetListProduct";
import { InitialFilterProduct } from "@/services/modules/product/interfaces/product";
import { useGet, useSave } from "@/stores/useStores";
import { Key, useCallback, useMemo, useState } from "react";

const ProductPage = () => {
  ///!State
  const defaultData = useGet("dataProduct");
  const cachesFilterProduct = useGet("cachesFilterProduct");
  const [isTrigger, setTrigger] = useState(Boolean(!defaultData));
  const save = useSave();

  const { filters, setFilters } = useFiltersHandler({
    PageSize: cachesFilterProduct?.PageSize || 50,
    CurrentPage: cachesFilterProduct?.CurrentPage || 1,
    TextSearch: "",
    SortColumn: "Name",
    SortDirection: "ASC",
  });

  const { data: dataProduct, loading } = useGetListProduct(
    filters as InitialFilterProduct,
    {
      isTrigger: isTrigger,
      refetchKey: cachedKeys.refetchProduct,
    }
  );

  const data = useMemo(
    () => (isTrigger ? dataProduct : defaultData),
    [dataProduct, defaultData, isTrigger]
  );

  const init = useMemo(() => {
    return {
      SortColumn: cachesFilterProduct?.SortColumn,
      SortDirection: cachesFilterProduct?.SortDirection,
    };
  }, [cachesFilterProduct?.SortColumn, cachesFilterProduct?.SortDirection]);

  //!Function

  const handleSearch = useCallback(
    (value: IValueFormPageHeader) => {
      console.log(value);
      setTrigger(true);
      setFilters((prev: any) => {
        const newParams = {
          ...prev,
          CurrentPage: 1,
          // TextSearch: value?.TextSearch,
          SortColumn: value?.SortColumn,
          SortDirection: value?.SortDirection,
        };
        save(cachedKeys.cachesFilterProduct, newParams);
        return newParams;
      });
    },
    [setFilters, save]
  );

  if (loading) return <LoadingScreen />;

  if (dataProduct.length === 0)
    return <EnhancedDataNotFound message="Data not found" />;
  return (
    <PageWrapper name="CategoryFilter" isLoading={loading}>
      <div className="container mx-auto rounded-md px-4 py-4">
        <h2 className="mb-10 text-2xl font-bold">Products</h2>
        <PageListHeader
          onClickSearch={handleSearch}
          dataProduct={dataProduct}
          optionsSortBy={[
            {
              label: "Name",
              value: "Name",
            },
            {
              label: "Price",
              value: "Price",
            },
            {
              label: "PublishedDate",
              value: "PublishedDate",
            },
          ]}
          setFilters={setFilters}
          initValue={init}
        />
        <div className="mt-3 flex">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map(
                (
                  product: {
                    Image: string;
                    Name: string;
                    Description: string;
                    Price: number;
                    Id: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <div key={index} className="flex">
                    <CardProduct
                      thumb_src={product.Image}
                      title={product.Name}
                      description={product.Description}
                      price={product.Price}
                      position="center"
                      detailId={product.Id}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductPage;
