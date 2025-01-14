import { motion } from "framer-motion";
import { get } from "lodash";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import PaginationVersionTop from "./PaginationVer2";

export enum ORDER_BY {
  DESC = "desc",
  ASC = "asc",
}

interface TableProps<T> {
  id: string;
  data: T[];
  columns: {
    label: string;
    accessor: string;
    width?: number;
    headerClassName?: string;
    Cell?: (row: T) => React.ReactNode;
  }[];
  tableCaption?: string;
  onClickRow?: (rowData: T) => void;
  keyRow?: string;
  className?: string;
  currentPage?: number;
  currentSize?: number;
  totalPage?: number;
  total?: number;
  handleChangePage?: (value: number) => void;
  noResultText?: string;
  handleChangeSize?: (value: number) => void;
  classPagination?: string;
  classHeadAndCell?: string;
  orderBy?: string;
  sortBy?: ORDER_BY;
  onChangeSortBy?: (newSort: ORDER_BY) => void;
  onChangeOrderBy?: (newOrder: string) => void;
}
const TablePaging = <T,>(props: TableProps<T>) => {
  const {
    id,
    columns,
    data,
    className,
    keyRow = "id",
    onClickRow,
    currentSize,
    currentPage,
    totalPage = 1,
    total,
    noResultText = "No Result",
    handleChangePage,
    handleChangeSize,
    classPagination,
    classHeadAndCell,
    orderBy,
    onChangeOrderBy,
  } = props;

  const [tableHeight, setTableHeight] = React.useState<number>();

  React.useEffect(() => {
    const elm = document.getElementById(id);
    setTableHeight(elm?.offsetHeight);
  }, [id]);

  const handleChangeOrderBy = (newAccessor: string) => {
    if (newAccessor !== orderBy) {
      onChangeOrderBy?.(newAccessor);
    }
  };

  return (
    <div
      className="relative mb-8 grow"
      id={id}
      style={{ maxHeight: tableHeight ? tableHeight : "unset" }}
    >
      {currentPage && (
        <div className={`bg-white px-[9px] py-[15px] ${classPagination}`}>
          <PaginationVersionTop
            currentPage={currentPage}
            rowPerPage={currentSize}
            totalPage={totalPage}
            dataLength={data?.length}
            total={total}
            onPageSizeChange={(size) => {
              handleChangeSize?.(size || 10);
            }}
            onChangePage={(page?: number) => {
              handleChangePage?.(page || 1);
            }}
          />
        </div>
      )}

      <div className={`${className} overflow-x-auto`}>
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col?.accessor || index}
                  className={`whitespace-nowrap border-b px-4 py-3 text-left text-sm font-medium text-gray-900 ${classHeadAndCell}`}
                  style={{ width: col?.width }}
                >
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleChangeOrderBy(col?.accessor)}
                  >
                    {col?.label}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {noResultText}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                  key={get(row, keyRow)}
                  onClick={() => onClickRow?.(row)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={`${get(row, keyRow)}-${colIndex}`}
                      className={`whitespace-nowrap px-4 py-4 text-sm text-gray-900 ${classHeadAndCell}`}
                      style={{ width: col?.width }}
                    >
                      {col.Cell ? col.Cell(row) : get(row, col.accessor)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePaging;
