import { ImageSource } from "@/assets";
import CommonIcons from "@/components/commonIcons";
import DialogCart from "@/components/dialogs/DialogCart";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import DropDownMenuProfile from "@/components/dropdowns/DropdownMenuProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import BaseUrl from "@/consts/baseUrl";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useAuth } from "@/providers/AuthenticationProvider";
import { useCartStore } from "@/stores/useStores";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  //!State
  const navigation = useNavigate();
  const { isLogged, user, logout } = useAuth();
  const [openAskLogout, toggleAskLogout, shouldRenderAskLogout] =
    useToggleDialog();
  const location = useLocation();
  const path = location.pathname;
  const getItemCount = useCartStore((state) => state.getItemCount());

  const menu = [
    {
      label: "Order Summary",
      onClick: () => navigation(BaseUrl.PaymentSuccess),
    },
    {
      label: "General Information",
      onClick: () => navigation(BaseUrl.Profile),
    },
    {
      label: "Logout",
      onClick: () => toggleAskLogout(),
    },
  ];

  const routes = [
    {
      label: "Landing Page",
      href: BaseUrl.LandingPage,
    },
    {
      label: "Product",
      href: BaseUrl.ProductPage,
    },
  ];

  const [openCart, toggleOpenCart, shouldRenderOpenCart] = useToggleDialog();
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();

  //!Function

  //!Render
  return (
    <header className="component:NavigationBar sticky top-0 z-50 bg-white shadow">
      {shouldRenderAskLogout && (
        <DialogConfirm
          isOpen={openAskLogout}
          toggle={toggleAskLogout}
          title={"Logout"}
          content={"Are you sure you want to logout?"}
          variantYes={"destructive"}
          onSubmit={() => logout()}
        />
      )}
      {shouldRenderOpenCart && (
        <DialogCart
          isOpen={openCart}
          toggle={toggleOpenCart}
          title={"Cart"}
          variantYes={"destructive"}
        />
      )}
      {shouldRenderAskLogin && (
        <DialogConfirm
          isOpen={openAskLogin}
          toggle={toggleAskLogin}
          title={"Login"}
          content={"You need to login to view cart"}
          variantYes={"destructive"}
          onSubmit={() => navigation(BaseUrl.Login)}
        />
      )}
      <div className="flex w-screen items-center justify-between px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="px-[32px] text-lg font-bold">
            <img
              src={ImageSource.logoApp}
              className={"h-[72px] w-[40px] 2xl:h-[42px] 2xl:w-[30px]"}
              alt={"logoApp"}
            />
          </Link>
          {routes.map((el, index) => {
            const active = path?.includes(el?.href);
            const classActive = active ? "font-bold bg-bgContainerContent" : "";

            return (
              <Link
                className={`${
                  active ? "border-b-2 border-black" : "border-b-0"
                } typo-24 navigation-bar each-route text-l flex cursor-pointer items-center px-10 py-5 text-black hover:bg-bgContainerContent ${classActive}`}
                key={index}
                to={el.href}
              >
                <div className={`typo-6 2xl:text-typo-3 whitespace-normal`}>
                  {el.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {isLogged ? (
            <DropDownMenuProfile
              button={
                <div className={"flex cursor-pointer items-center"}>
                  <CommonIcons.Settings className={"mr-2 h-[24px] w-[24px]"} />
                </div>
              }
              content={
                <div>
                  {menu?.map((item) => {
                    // if (item?.subMenu) {
                    //   return (
                    //     <div className="w-full" key={item.label}>
                    //       <DropdownMenuSub>
                    //         <DropdownMenuSubTrigger
                    //           className={"w-full cursor-pointer px-2 text-left"}
                    //         >
                    //           {/* <DropdownMenuItem> */}
                    //           <div
                    //             className={"typo-3 w-full p-1 text-left"}
                    //             // onClick={item.onClick}
                    //           >
                    //             {item.label}
                    //           </div>
                    //           {/* </DropdownMenuItem> */}
                    //         </DropdownMenuSubTrigger>
                    //         <DropdownMenuPortal>
                    //           <DropdownMenuSubContent className="min-w-52">
                    //             {item?.subMenu?.map(
                    //               (e: {
                    //                 label: string;
                    //                 onClick: () => void;
                    //               }) => {
                    //                 return (
                    //                   <DropdownMenuItem
                    //                     key={e.label}
                    //                     className="cursor-pointer"
                    //                     onClick={() => e?.onClick?.()}
                    //                   >
                    //                     <div className={"typo-3 p-1 text-left"}>
                    //                       {e.label}
                    //                     </div>
                    //                   </DropdownMenuItem>
                    //                 );
                    //               }
                    //             )}
                    //           </DropdownMenuSubContent>
                    //         </DropdownMenuPortal>
                    //       </DropdownMenuSub>
                    //     </div>
                    //   );
                    // }
                    return (
                      <DropdownMenuItem key={item.label}>
                        <div className="w-full" key={item.label}>
                          <div
                            className={
                              "typo-3 w-full cursor-pointer p-1 text-left"
                            }
                            onClick={item.onClick}
                          >
                            {item.label}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              }
            />
          ) : (
            <>
              <Button
                variant={"outline"}
                className={"text-black"}
                onClick={() => navigation(BaseUrl.Login)}
                // onClick={toggleLogin}
              >
                Login
              </Button>
            </>
          )}
          <div className="flex items-center">
            {isLogged && (
              <Avatar
                // onClick={() => navigation(BaseUrl.Profile)}
                className="bg-blackA1 inline-flex h-11 w-11 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full align-middle"
              >
                <AvatarImage
                  className="h-full w-full rounded-[inherit] object-cover 2xl:h-[24px] 2xl:w-[24px]"
                  src={user?.Avatar}
                  alt="avatar"
                  onClick={() => navigation(BaseUrl.Profile)}
                />
                <AvatarFallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center border bg-white text-[15px] font-medium text-black">
                  DT
                </AvatarFallback>
              </Avatar>
            )}
            <div className={"typo-6 2xl:text-typo-4 mx-2 cursor-default"}>
              {user?.FullName}
            </div>
          </div>
          <div className="flex items-center justify-normal gap-2">
            <div className="relative">
              <CommonIcons.ShoppingCart
                className={"h-[20px] w-[20px] hover:cursor-pointer"}
                color="red"
                onClick={isLogged ? toggleOpenCart : toggleAskLogin}
              />
            </div>
            <div
              className="absolute right-[11px] top-[14px] flex max-h-[18px] max-w-[20px] items-center justify-center overflow-hidden rounded-full bg-yellow-300 p-1"
              style={{ fontSize: "10px" }}
            >
              {getItemCount || 0}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
