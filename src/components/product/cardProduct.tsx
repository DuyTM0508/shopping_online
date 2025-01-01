import BaseUrl from "@/consts/baseUrl";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Link, useNavigate } from "react-router-dom";
import CommonIcons from "../commonIcons";
import DialogConfirm from "../dialogs/DialogConfirm";
import { Button } from "../ui/button";

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
  //!State
  const { isLogged } = useAuth();
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();
  const navigation = useNavigate();

  const textAlign =
    position === "center"
      ? "text-center"
      : position === "left"
      ? "text-left"
      : "text-right";

  //!Function
  const handleCheckLogin = () => {
    if (!isLogged) {
      toggleAskLogin();
    }
  };

  //!Render
  return (
    <>
      <div className="border-gray-200 mb-5 rounded-lg border shadow-md">
        {shouldRenderAskLogin && (
          <DialogConfirm
            isOpen={openAskLogin}
            toggle={toggleAskLogin}
            title={"Login"}
            content={"You need to login to shop"}
            variantYes={"destructive"}
            onSubmit={() => navigation(BaseUrl.Login)}
          />
        )}
        <div className="">
          <Link to={`${BaseUrl.ProductPage}/${detailId}`}>
            <img
              className="h-full w-full rounded-t-lg object-cover"
              src={thumb_src}
            />
          </Link>
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
              onClick={handleCheckLogin}
            >
              Shop Now
              <CommonIcons.ShoppingCart
                className={"ml-1 h-[20px] w-[20px]"}
                color="red"
              />
            </Button>
          }
        </div>
      </div>
    </>
  );
}
