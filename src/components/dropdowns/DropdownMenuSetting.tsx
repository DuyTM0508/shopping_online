import { useTranslation } from "react-i18next";
import CommonIcons from "../commonIcons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DropDownMenuSetting = () => {
  const { t, i18n } = useTranslation("shared");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <CommonIcons.Settings />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <div>
            <Button
              variant={"ghost"}
              className={"hover:bg-gray-400 w-full p-1 text-left"}
              onClick={() => i18n.changeLanguage("en")}
            >
              {"English"}
            </Button>
            <Button
              variant={"ghost"}
              className={"hover:bg-gray-400 w-full p-1 text-left"}
              onClick={() => i18n.changeLanguage("jp")}
            >
              {"Japanese"}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default DropDownMenuSetting;
