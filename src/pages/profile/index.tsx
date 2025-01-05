import { ImageSource } from "@/assets";
import BaseUrl from "@/consts/baseUrl";
import { getFromStorage } from "@/helpers/common";
import { USER_KEY } from "@/services/httpService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const data = getFromStorage(USER_KEY);
  const userInfo = JSON.parse(data?.data || "");
  //! State
  const navigate = useNavigate();

  const initialValues = {
    email: userInfo?.Email ?? "",
    fullName: userInfo?.FullName ?? "",
    phoneNumber: userInfo?.PhoneNumber ?? "",
    fileUpload: userInfo?.Avatar ?? ImageSource.avartarDefault,
  };

  //!Function

  //!Render

  return (
    <div className="component:Profile p-8">
      <div className="typo-7 font-semibold text-text-secondary">
        {"General Information"}
      </div>
      <div className="mt-4 flex-1 gap-2 rounded-xl bg-white p-6 md:flex">
        <img
          src={initialValues?.fileUpload || ""}
          alt="upload"
          className={"mr-6 h-[229px] w-[229px] rounded-sm border"}
        />
        <div className="flex-1">
          <div
            className={"typo-16 flex items-center font-medium leading-[44px]"}
          >
            {initialValues.fullName}
            <img
              src={ImageSource.editIcon}
              className="ml-2 cursor-pointer"
              onClick={() => navigate(BaseUrl.EditProfile)}
            />
          </div>
          <div className="my-6">
            <div className="typo-6">
              {"Email"}: {initialValues.email}
            </div>
            <div className="typo-6 mt-3">
              {"Phone"}: {initialValues.phoneNumber}
            </div>
          </div>
        </div>
      </div>
      {/* {shouldRenderChangePass && (
        <DialogChangePass isOpen={openChangePass} toggle={toggleChangePass} />
      )} */}
    </div>
  );
};

export default Profile;
