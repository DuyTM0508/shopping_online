import CommonIcons from "@/components/commonIcons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";

export interface IPaginationVersionTop {
  currentPage?: number;
  totalPage?: number;
  rowPerPage?: number;
  listOptions?: number[];
  onChangePage?: (page?: number) => void;
  onPageSizeChange?: (size?: number) => void;
  dataLength?: number;
  total?: number;
}
const listOptionsDefault = [10, 20, 50, 100];

const PaginationVersionTop = (props: IPaginationVersionTop) => {
  const {
    currentPage = 1,
    totalPage = 1,
    rowPerPage = 10,
    listOptions = listOptionsDefault,
    onChangePage,
    onPageSizeChange,
    dataLength = 0,
    total = 0,
  } = props;
  return (
    <div className={"flex w-full items-center justify-between"}>
      <div className={"typo-33 2xl:text-typo-6 ml-2 text-text-sub"}>
        {`${(currentPage - 1) * rowPerPage + 1} - ${
          (currentPage - 1) * rowPerPage + dataLength
        } of ${total}`}
      </div>
      <div className={"mr-5 flex items-center"}>
        <div className={"flex items-center"}>
          <div
            className={
              "typo-29 2xl:text-typo-29 grow font-medium text-text-sub"
            }
          >
            Row per page:
          </div>
          <Select
            value={`${rowPerPage}`}
            onValueChange={(value: string) => onPageSizeChange?.(Number(value))}
          >
            <SelectTrigger
              className="SelectTrigger typo-28 2xl:text-typo-28 mx-2 h-[24px] !w-auto !bg-transparent px-2 py-[0] text-text-sub focus:outline-none focus:ring-0 focus:ring-offset-0 2xl:h-[18px] 2xl:w-[38px] 2xl:px-[6px] 2xl:py-[3px]"
              aria-label="Food"
            >
              <SelectValue placeholder={rowPerPage} />
            </SelectTrigger>
            <SelectContent className="SelectContent">
              <SelectGroup>
                {listOptions?.map((e, index) => {
                  return (
                    <SelectItem key={index} value={`${e}`}>
                      {e}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
              {/* <SelectSeparator className="SelectSeparator" /> */}
            </SelectContent>
          </Select>
        </div>
        <div className={"flex items-center gap-2 2xl:gap-[7.5px]"}>
          {currentPage !== 1 && (
            <Button
              className={"h-auto min-w-0 !bg-transparent px-[4px] py-[2px]"}
              variant={"outline"}
              onClick={() => onChangePage?.(1)}
              disabled={currentPage === 1}
            >
              <CommonIcons.ChevronsLeft
                className={"h-[16px] w-[16px] text-text-sub 2xl:h-3 2xl:w-3"}
              />
            </Button>
          )}
          <Button
            className={twMerge(
              "h-auto min-w-0 !bg-transparent px-[4px] py-[2px]",
              currentPage === 1 && "!bg-bg-buttonPagingDisabled"
            )}
            variant={"outline"}
            disabled={currentPage === 1}
            onClick={() => onChangePage?.((currentPage || 2) - 1)}
          >
            <CommonIcons.ChevronLeft
              className={"h-[16px] w-[16px] text-text-sub 2xl:h-3 2xl:w-3"}
            />
          </Button>
          <div className={"flex text-text-sub"}>
            {currentPage && totalPage && (
              <>
                <span className="typo-30 2xl:text-typo-30 text-black">
                  {currentPage}
                </span>
                <span className="typo-30 2xl:text-typo-30">/</span>
                <span className="typo-30 2xl:text-typo-30 text-text-sub">
                  {totalPage}
                </span>
              </>
            )}
          </div>
          <Button
            className={twMerge(
              "h-auto min-w-0 !bg-transparent px-[4px] py-[2px]",
              currentPage === totalPage && "!bg-bg-buttonPagingDisabled"
            )}
            variant={"outline"}
            onClick={() => onChangePage?.((currentPage || 0) + 1)}
            disabled={currentPage === totalPage}
          >
            <CommonIcons.ChevronRight
              className={"h-[16px] w-[16px] text-text-sub 2xl:h-3 2xl:w-3"}
            />
          </Button>
          {currentPage !== totalPage && (
            <Button
              className={"h-auto min-w-0 !bg-transparent px-[4px] py-[2px]"}
              variant={"outline"}
              onClick={() => onChangePage?.(totalPage)}
            >
              <CommonIcons.ChevronsRight
                className={"h-[16px] w-[16px] text-text-sub 2xl:h-3 2xl:w-3"}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationVersionTop;
