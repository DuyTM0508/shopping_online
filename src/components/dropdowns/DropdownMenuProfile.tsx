import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface IPropsDropDownMenuProfile {
  button: React.ReactNode;
  content: React.ReactNode;
}

const DropDownMenuProfile = (props: IPropsDropDownMenuProfile) => {
  const { button, content } = props;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          {content}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default DropDownMenuProfile;
