import cachedKeys from "@/consts/cachedKeys";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import useToggleDialog from "@/hooks/useToggleDialog";
import useGetListProduct from "@/services/modules/product/hooks/useGetListProduct";
import {
  InitialFilterProduct,
  ProductList,
} from "@/services/modules/product/interfaces/product";
import { useGet, useSave } from "@/stores/useStores";
import { motion } from "framer-motion";
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import PageWrapper from "../PageWrapper/PageWrapper";
import TablePaging from "../tableCommon/v2/tablePaging";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import BaseUrl from "@/consts/baseUrl";
import DialogConfirm from "../dialogs/DialogConfirm";
import useGetCateGory from "@/services/modules/category/hooks/useGetCategory";

const TableTwo = () => {
  //!State
  const defaultData = useGet("dataProduct");
  const cachesFilterProduct = useGet("cachesFilterProduct");
  const totalProductCount = useGet("totalProductCount");
  const totalPageProduct = useGet("totalPageCount");
  const [isTrigger, setTrigger] = useState(Boolean(!defaultData));
  const save = useSave();
  const navigate = useNavigate();

  const { filters, setFilters } = useFiltersHandler({
    PageSize: cachesFilterProduct?.PageSize || 50,
    CurrentPage: cachesFilterProduct?.CurrentPage || 1,
    TextSearch: "",
    SortColumn: "",
    SortDirection: "",
  });

  const { category } = useGetCateGory();

  const {
    data: dataProduct,
    loading,
    loadingMore,
    refetching,
  } = useGetListProduct(filters as InitialFilterProduct, {
    isTrigger: isTrigger,
    refetchKey: cachedKeys.refetchProduct,
  });

  const data = useMemo(
    () => (isTrigger ? dataProduct : defaultData),
    [dataProduct, defaultData, isTrigger]
  );

  const [
    openDeleteProduct,
    toggleOpenDeleteProduct,
    shouldRenderOpenDeleteProduct,
  ] = useToggleDialog();

  const col = [
    {
      label: "Image",
      accessor: "Image",
      width: 100,
      Cell: (row: ProductList) => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md">
          <img
            src={row?.Image}
            alt={row?.Name}
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
        </div>
      ),
    },
    {
      label: "Name",
      accessor: "Name",
      Cell: (row: ProductList) => (
        <div className="font-medium">{row?.Name}</div>
      ),
    },
    {
      label: "Category",
      accessor: "Category",
      Cell: (row: ProductList) => (
        <div className="text-gray-600">
          {category?.find((item) => item.Id === row?.Category)?.Name}
        </div>
      ),
    },
    {
      label: "Price",
      accessor: "Price",
      Cell: (row: ProductList) => (
        <div className="font-medium">
          ${Number(row?.Price).toLocaleString()}
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "Status",
      Cell: (row: ProductList) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Active
          </span>
        </div>
      ),
    },
    {
      label: "Action",
      accessor: "actions",
      width: 100,
      Cell: (row: ProductList) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${BaseUrl.AddNewProduct}/${row?.Id}`);
                }}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  toggleOpenDeleteProduct();
                }}
                className="cursor-pointer text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  //!Function
  const handleChangePageSize = useCallback(
    (size: number) => {
      setTrigger(true);
      setFilters((prev: any) => {
        const newParams = {
          ...prev,
          CurrentPage: 1,
          PageSize: size,
        };
        save(cachedKeys.cachesFilterProduct, newParams);
        return newParams;
      });
    },
    [setFilters, save]
  );

  const handleChangePage = useCallback(
    (page: number) => {
      setTrigger(true);
      setFilters((prev: any) => {
        const newParams = {
          ...prev,
          CurrentPage: page,
        };
        save(cachedKeys.cachesFilterProduct, newParams);
        return newParams;
      });
    },
    [setFilters, save]
  );

  //!Render
  return (
    <PageWrapper
      name="ManageProduct"
      isLoading={loading || loadingMore || refetching}
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => {
              navigate(BaseUrl.AddNewProduct);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </motion.div>
      </div>
      <div className="rounded-lg border bg-white shadow">
        <TablePaging
          id={"tableProduct"}
          columns={col}
          data={data || []}
          noResultText={"No products found"}
          total={totalProductCount}
          currentPage={filters?.CurrentPage || 1}
          currentSize={filters?.PageSize || 1}
          totalPage={totalPageProduct}
          handleChangeSize={handleChangePageSize}
          handleChangePage={handleChangePage}
          className="w-full"
          classHeadAndCell="px-4 py-4"
          onClickRow={() => {
            // Handle row click
          }}
        />
      </div>
      {shouldRenderOpenDeleteProduct && (
        <DialogConfirm
          title="Delete Product"
          content="Are you sure you want to delete this product?"
          onSubmit={() => {
            // Handle delete product
          }}
          toggle={toggleOpenDeleteProduct}
          isOpen={openDeleteProduct}
          variantYes={"destructive"}
        />
      )}
    </PageWrapper>
  );
};

export default TableTwo;
