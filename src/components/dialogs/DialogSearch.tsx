import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetListProduct from "@/services/modules/product/hooks/useGetListProduct";
import { Formik } from "formik";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommonIcons from "../commonIcons";

export interface DialogProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit?: (values: any) => void;
}

const DialogSearch: React.FC<DialogProps> = ({ isOpen, toggle, onSubmit }) => {
  const navigate = useNavigate();
  const { filters } = useFiltersHandler({
    PageSize: 50,
    CurrentPage: 1,
  });
  const [search, setSearch] = useState("");

  const { data } = useGetListProduct(filters, {
    isTrigger: true,
  });

  const filterProduct = data?.filter((item) =>
    item?.Name.toLowerCase().includes(search?.toLocaleLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Search Products</DialogTitle>
          <DialogDescription className="text-center">
            Find the perfect product for you
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={onSubmit || (() => {})}
        >
          {() => (
            <div className="relative mt-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  extraLeft={
                    <CommonIcons.Search className="font-light text-icon-search 2xl:h-4 2xl:w-4" />
                  }
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-8"
                    onClick={() => setSearch("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {search && (
                <ScrollArea className="h-[300px] rounded-md border p-2">
                  {filterProduct.map((product) => (
                    <div
                      key={product.Id}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                      role="button"
                      onClick={() => {
                        navigate(`/product/${product.Id}`);
                        toggle();
                      }}
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-md border">
                        <img
                          src={product.Image}
                          alt={product.Name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{product.Name}</h4>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </div>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSearch;
