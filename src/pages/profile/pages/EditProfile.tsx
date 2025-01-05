import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import ButtonUploadField from "@/components/customFieldsFormik/UploadButtonField";
import { Button } from "@/components/ui/button";
import { regexCommon } from "@/consts/regex";
import { getFromStorage } from "@/helpers/common";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthenticationProvider";
import httpService, { USER_KEY } from "@/services/httpService";
import ProfileService from "@/services/modules/profile/profileService";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface IValueFormik {
  fullName: string;
  phoneNumber: string;
  email: string;
  Avatar: string;
  WardID: number;
  DistrictID?: number;
  ProvinceID?: number;
  DateOfBirth?: string;
}

const EditProfile = () => {
  const data = getFromStorage(USER_KEY);
  const userInfo = JSON.parse(data?.data || "");
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const { updateUser } = useAuth();
  const token = httpService.getTokenStorage();

  const initialValues: IValueFormik = {
    email: userInfo?.Email ?? "",
    fullName: userInfo?.FullName ?? "",
    phoneNumber: userInfo?.PhoneNumber ?? "",
    Avatar: userInfo?.Avatar ?? "",
    WardID: userInfo?.WardID ?? 0,
    DistrictID: userInfo?.DistrictID ?? 0,
    ProvinceID: userInfo?.ProvinceID ?? 0,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("")
      .max(20, 'Tên không được vượt quá 20 ký tự. Vui lòng kiểm tra lại "Tên"')
      .test(
        "invalid",
        'Tên không được chứa ký tự đặc biệt. Vui lòng kiểm tra lại "Tên"',
        function (value) {
          const regex = /^[\p{L}\p{M} ]+$/u;
          return regex.test(value || "");
        }
      ),
    phoneNumber: Yup.string()
      .test("invalid", "Must Number", function (value) {
        const regex = /^[0-9]+$/;
        return regex.test(value || "");
      })
      .required(
        'Số điện thoại không được để trống. Vui lòng kiểm tra lại "Số điện thoại"'
      )
      .matches(
        regexCommon.regexPhone,
        'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại "Số điện thoại"'
      ),
  });

  const handleUpdateProfile = async (values: IValueFormik) => {
    const bodyUpload = new FormData();
    try {
      bodyUpload.append("Avatar", file || userInfo?.Avatar);
      bodyUpload.append("FullName", values.fullName);
      bodyUpload.append("Email", values.email);
      bodyUpload.append("PhoneNumber", values.phoneNumber);
      bodyUpload.append("WardID", values.WardID.toString());
      bodyUpload.append("DistrictID", values.DistrictID?.toString() || "");
      bodyUpload.append("ProvinceID", values.ProvinceID?.toString() || "");

      httpService.attachTokenToHeader(token);
      const response = await ProfileService.updateProfile(bodyUpload);
      console.log(response);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.Object));
      updateUser(response.data.Object);
      showSuccess("Cập nhật thông tin thành công");
      navigate(-1);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="component:EditProfile p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <div className="mt-4 bg-white p-[24px]">
                <div className="rounded-xl">
                  <FormikField
                    notIcon={Boolean(values.Avatar)}
                    component={ButtonUploadField}
                    text={
                      values.Avatar ? (
                        <img
                          src={values?.Avatar}
                          alt="upload"
                          className={"h-[229px] w-[229px] rounded-sm border"}
                        />
                      ) : undefined
                    }
                    upload={(file: File) => {
                      setFieldValue("Avatar", URL.createObjectURL(file));
                      setFile(file);
                    }}
                    name="Avatar"
                    accept={"image/*"}
                    className={
                      "flex h-[229px] w-[229px] cursor-pointer items-center justify-center rounded-sm border"
                    }
                  />
                </div>
                <div className="mt-6 grid flex-1 gap-5">
                  <FormikField
                    component={InputField}
                    name="fullName"
                    label={"Full Name"}
                    placeholder={"Full Name"}
                    required
                  />
                  <FormikField
                    component={InputField}
                    disabled
                    name={"email"}
                    label={"Email"}
                    placeholder={"Email"}
                    required
                  />
                  <FormikField
                    component={InputField}
                    name="phoneNumber"
                    label={"Phone Number"}
                    placeholder={"Phone Number"}
                    required
                  />
                </div>
                <div className="mt-9 flex justify-end gap-10">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-main-primary px-10"
                  >
                    {"Save"}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfile;
