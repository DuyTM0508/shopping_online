import BaseUrl from "@/consts/baseUrl";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Link } from "react-router-dom";
import CommonIcons from "../commonIcons";
import { Button } from "../ui/button";

interface Props {
  thumb_src: string;
  title: string;
  description: string;
  price: number;
  position: string;
}

export default function CardProduct({
  thumb_src,
  title,
  description,
  price,
  position,
}: Props) {
  //!State
  const { isLogged } = useAuth();

  //!Function

  const textAlign =
    position === "center"
      ? "text-center"
      : position === "left"
      ? "text-left"
      : "text-right";

  //!Render
  return (
    <>
      <div className="border-gray-200 mb-5 rounded-lg border shadow-md">
        <Link to={isLogged ? "#" : BaseUrl.Login}>
          <div className="">
            <img
              className="h-full w-full rounded-t-lg object-cover p-4"
              src={thumb_src}
              // alt={thumb_alt}
            />
          </div>
          <div className={`p-4 ${textAlign}`}>
            {title && <h4 className="font-bold">{title}</h4>}
            {description && <p className="text-gray-500">{description}</p>}
            {price && (
              <h4 className="mb-3 mt-1 text-lg font-semibold">
                ${price.toLocaleString()}
              </h4>
            )}
            {
              // <Link
              //   to="#"
              //   className="text-gray-500 flex items-center justify-center gap-1 text-sm font-normal"
              // >
              //   Shop Now
              //   <CommonIcons.ShoppingCart
              //     className={"h-[24px] w-[24px]"}
              //     color="red"
              //   />
              // </Link>
              <Button
                className={"typo-13 bg-main-primary"}
                type="submit"
                variant={"destructive"}
              >
                Shop Now
                <CommonIcons.ShoppingCart
                  className={"ml-1 h-[20px] w-[20px]"}
                  color="red"
                />
              </Button>
            }
          </div>
        </Link>
      </div>
    </>
  );
}
