import { ImageSource } from "@/assets";
import AnimatedLoveMessage from "@/components/animation/AnimatedLoveMessage";
import CartIcon from "@/components/cart/CartIcon";
import CommonIcons from "@/components/commonIcons";
import DialogCart from "@/components/dialogs/DialogCart";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import DialogSearch from "@/components/dialogs/DialogSearch";
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
      label: "Home",
      href: BaseUrl.LandingPage,
    },
    {
      label: "Shop",
      href: BaseUrl.ProductPage,
    },
    {
      label: "About",
      href: BaseUrl.About,
    },
  ];

  const [openCart, toggleOpenCart, shouldRenderOpenCart] = useToggleDialog();
  const [openAskLogin, toggleAskLogin, shouldRenderAskLogin] =
    useToggleDialog();
  const [openSearch, toggleSearch, shouldRenderSearch] = useToggleDialog();

  //!Function

  //!Render
  return (
    <header className="component:NavigationBar sticky z-50 bg-white shadow">
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
      {shouldRenderSearch && (
        <DialogSearch isOpen={openSearch} toggle={toggleSearch} />
      )}
      <AnimatedLoveMessage />

      <hr></hr>

      <div className="flex w-screen items-center justify-around px-4 pt-2">
        <img
          src={ImageSource.searchIcon}
          className="hover:cursor-pointer"
          onClick={toggleSearch}
        />
        <Link
          to="/"
          className={`${
            !isLogged ? "ml-[1.3rem]" : "ml-[6.5rem]"
          } px-[32px] text-lg font-bold`}
        >
          <img
            src={ImageSource.secondHandLogo}
            className={"w-14"}
            alt={"logoApp"}
          />
        </Link>
        <div className="flex items-center justify-normal gap-2">
          <CartIcon
            isLogged={isLogged}
            count={getItemCount}
            onCartClick={toggleOpenCart}
            onLoginClick={toggleAskLogin}
          />
          {isLogged && (
            <DropDownMenuProfile
              button={
                <div className={"flex cursor-pointer items-center"}>
                  <CommonIcons.Settings className={"mr-2 h-[24px] w-[24px]"} />
                </div>
              }
              content={
                <div>
                  {menu?.map((item) => {
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
          )}
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
        </div>
      </div>

      <div className="flex w-screen items-center justify-center px-2">
        <div className="flex items-center">
          {routes.map((el, index) => {
            const active = path?.includes(el?.href);
            const classActive = active ? "font-bold" : "";

            return (
              <Link
                className={`${
                  active ? "underline" : "border-b-0"
                } typo-24 navigation-bar each-route text-l flex cursor-pointer items-center px-10 py-5 text-black hover:bg-bgContainerContent ${classActive}`}
                key={index}
                to={el.href}
              >
                <div
                  className={`typo-6 2xl:text-typo-3 typo-4 whitespace-normal hover:underline`}
                >
                  {el.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 pb-2">
        {!isLogged && (
          <>
            <Button
              variant={"outline"}
              className={"text-black"}
              onClick={() => navigation(BaseUrl.Login)}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
