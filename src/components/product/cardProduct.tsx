"use client";

import BaseUrl from "@/consts/baseUrl";
import useToggleDialog from "@/hooks/useToggleDialog";
import { Link } from "react-router-dom";
import DialogProduct from "../../pages/productPage/dialogs/DialogProduct";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Eye } from "lucide-react";

interface Props {
  thumb_src: string;
  title: string;
  description: string;
  price: number;
  position: string;
  detailId: string;
}

export default function CardProduct({
  detailId,
  thumb_src,
  title,
  description,
  price,
  position,
}: Props) {
  const [openAskQuickView, toggleAskQuickView, shouldRenderAskQuickView] =
    useToggleDialog();

  const textAlign =
    position === "center"
      ? "text-center"
      : position === "left"
      ? "text-left"
      : "text-right";

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-lg">
        {shouldRenderAskQuickView && (
          <DialogProduct
            isOpen={openAskQuickView}
            toggle={toggleAskQuickView}
            title={"Quick View"}
            detailId={detailId}
            variantYes={"destructive"}
            titleButtonConfirm="Add To Cart"
            titleButtonCancel="Continue Shopping"
          />
        )}

        <Link to={`${BaseUrl.ProductPage}/${detailId}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={thumb_src}
              alt={title}
            />
            <Badge className="absolute left-4 top-4 bg-white/90 text-black backdrop-blur-sm">
              New
            </Badge>
          </div>
        </Link>

        <div className={`relative p-6 ${textAlign}`}>
          <Button
            className="absolute -top-7 right-4 h-14 w-14 rounded-full bg-white/90 text-black opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white group-hover:opacity-100"
            size="icon"
            onClick={toggleAskQuickView}
          >
            <Eye className="h-5 w-5" />
          </Button>

          {title && (
            <h3 className="mb-1 truncate text-lg font-medium tracking-tight">
              {title}
            </h3>
          )}

          {description && (
            <p className="mb-3 truncate text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {price && (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">
                {price.toLocaleString()} VND
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {(price * 1.2).toLocaleString()} VND
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
