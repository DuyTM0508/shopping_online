import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regexCommon } from "@/consts/regex";
import { getFromStorage } from "@/helpers/common";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthenticationProvider";
import httpService, { USER_KEY } from "@/services/httpService";
import useGetDistrict from "@/services/modules/city/hooks/useGetDistrict";
import useGetListCity from "@/services/modules/city/hooks/useGetListCity";
import useGetWard from "@/services/modules/city/hooks/useGetWard";
import ProfileService from "@/services/modules/profile/profileService";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface IValueFormik {
  fullName: string;
  phoneNumber: string;
  email: string;
  Avatar: string;
  WardID: number | string;
  DistrictID?: number | string;
  ProvinceID?: number | string;
  DateOfBirth?: string;
  DetailAddress: string;
}

const EditProfile = () => {
  const data = getFromStorage(USER_KEY);
  const userInfo = JSON.parse(data?.data || "");
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const { updateUser } = useAuth();
  const token = httpService.getTokenStorage();

  const formatProvinceId = userInfo?.ProvinceID.toString().padStart(2, "0");
  const formatDistrictId = userInfo?.DistrictID.toString().padStart(3, "0");
  const formatWardId = userInfo?.WardID.toString().padStart(5, "0");

  const [provinceId, setProvinceId] = useState<string | undefined>(
    formatProvinceId
  );
  const [districtId, setDistrictId] = useState<string | undefined>(
    formatDistrictId
  );

  const initialValues: IValueFormik = {
    email: userInfo?.Email ?? "",
    fullName: userInfo?.FullName ?? "",
    phoneNumber: userInfo?.PhoneNumber ?? "",
    Avatar: userInfo?.Avatar ?? "",
    WardID: formatWardId ?? 0,
    DistrictID: districtId ?? 0,
    ProvinceID: provinceId ?? 0,
    DetailAddress: userInfo?.DetailAddress ?? "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .max(20, "Full Name cannot exceed 20 characters")
      .matches(
        /^[a-zA-Z\sÀ-ỹ]+$/,
        "Full Name cannot include special characters"
      ),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]+$/, "Phone Number must be numeric")
      .matches(regexCommon.regexPhone, "Invalid Phone Number"),
    ProvinceID: Yup.number().required("City is required"),
    DetailAddress: Yup.string().required("Detail Address is required"),
  });

  const { listCity: city, loading: loadingCity } = useGetListCity();
  const { listDistrict, loading: loadingDistrict } = useGetDistrict(
    provinceId || ""
  );
  const { listWard, loading: loadingWard } = useGetWard(districtId || "");

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
      bodyUpload.append("DetailAddress", values.DetailAddress);

      httpService.attachTokenToHeader(token);
      const response = await ProfileService.updateProfile(bodyUpload);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.Object));
      updateUser(response.data.Object);
      showSuccess("Profile updated successfully");
      navigate(-1);
    } catch (error) {
      showError(error);
    }
  };

  const FormField = ({ label, required, children, error }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-8"
    >
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateProfile}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
              console.log(values),
              (
                <Form className="space-y-8">
                  <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-gray-100 shadow-lg">
                        {values.Avatar ? (
                          <img
                            src={values.Avatar}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100">
                            <Camera className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFieldValue("Avatar", URL.createObjectURL(file));
                            setFile(file);
                          }
                        }}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-lg">
                        <Camera className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label="Full Name"
                      required
                      error={touched.fullName && errors.fullName}
                    >
                      <Input
                        name="fullName"
                        placeholder="Enter your full name"
                        value={values.fullName}
                        onChange={(e) =>
                          setFieldValue("fullName", e.target.value)
                        }
                        className="w-full"
                      />
                    </FormField>

                    <FormField label="Email" required>
                      <Input
                        name="email"
                        value={values.email}
                        disabled
                        className="w-full bg-gray-50"
                      />
                    </FormField>

                    <FormField
                      label="Phone Number"
                      required
                      error={touched.phoneNumber && errors.phoneNumber}
                    >
                      <Input
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={values.phoneNumber}
                        onChange={(e) =>
                          setFieldValue("phoneNumber", e.target.value)
                        }
                        className="w-full"
                      />
                    </FormField>

                    <FormField
                      label="City"
                      required
                      error={touched.ProvinceID && errors.ProvinceID}
                    >
                      <Select
                        value={values.ProvinceID?.toString()}
                        onValueChange={(value) => {
                          setProvinceId(value);
                          setFieldValue("ProvinceID", value);
                          setFieldValue("DistrictID", "");
                          setFieldValue("WardID", "");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {loadingCity ? (
                            <div className="flex justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          ) : (
                            city?.map((item: any) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField
                      label="District"
                      required
                      error={touched.DistrictID && errors.DistrictID}
                    >
                      <Select
                        value={values.DistrictID?.toString()}
                        onValueChange={(value) => {
                          setDistrictId(value);
                          setFieldValue("DistrictID", value);
                          setFieldValue("WardID", "");
                        }}
                        disabled={!values.ProvinceID}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {loadingDistrict ? (
                            <div className="flex justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          ) : (
                            listDistrict?.map((item: any) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField
                      label="Ward"
                      required
                      error={touched.WardID && errors.WardID}
                    >
                      <Select
                        value={values.WardID?.toString()}
                        onValueChange={(value) =>
                          setFieldValue("WardID", value)
                        }
                        disabled={!values.DistrictID}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select ward" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {loadingWard ? (
                            <div className="flex justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          ) : (
                            listWard?.map((item: any) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField
                      label="Detail Address"
                      required
                      error={touched.DetailAddress && errors.DetailAddress}
                    >
                      <Input
                        name="DetailAddress"
                        placeholder="Enter your detail address"
                        value={values.DetailAddress}
                        onChange={(e) =>
                          setFieldValue("DetailAddress", e.target.value)
                        }
                        className="w-full"
                      />
                    </FormField>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(-1)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[100px]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </Form>
              )
            )}
          </Formik>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditProfile;
