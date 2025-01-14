"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageSource } from "@/assets";
import BaseUrl from "@/consts/baseUrl";
import { getFromStorage } from "@/helpers/common";
import { USER_KEY } from "@/services/httpService";
import useGetDistrict from "@/services/modules/city/hooks/useGetDistrict";
import useGetListCity from "@/services/modules/city/hooks/useGetListCity";
import useGetWard from "@/services/modules/city/hooks/useGetWard";
import { useNavigate } from "react-router-dom";
import { Pencil, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const data = getFromStorage(USER_KEY);
  const userInfo = JSON.parse(data?.data || "");
  const navigate = useNavigate();

  const formatProvinceId = userInfo?.ProvinceID.toString().padStart(2, "0");
  const formatDistrictId = userInfo?.DistrictID.toString().padStart(3, "0");
  const formatWardId = userInfo?.WardID.toString().padStart(5, "0");

  const { listCity } = useGetListCity();
  const { listDistrict } = useGetDistrict(formatProvinceId);
  const { listWard } = useGetWard(formatDistrictId);

  const initialValues = {
    email: userInfo?.Email ?? "",
    fullName: userInfo?.FullName ?? "",
    phoneNumber: userInfo?.PhoneNumber ?? "",
    fileUpload: userInfo?.Avatar ?? ImageSource.avartarDefault,
    ProvinceID: listCity?.find((item) => item.value === formatProvinceId)
      ?.label,
    DistrictID: listDistrict?.find((item) => item.value === formatDistrictId)
      ?.label,
    WardID: listWard?.find((item) => item.value === formatWardId)?.label,
    addressDetail: userInfo?.DetailAddress,
  };

  useEffect(() => {
    if (listCity && listDistrict && listWard) {
      setIsLoading(false);
      // Delay showing content slightly to ensure smooth transition
      setTimeout(() => setIsDataReady(true), 100);
    }
  }, [listCity, listDistrict, listWard]);

  const InfoItem = ({ label, value }: { label?: string; value: string }) => (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      {label && <span className="mb-1 text-sm text-gray-500">{label}</span>}
      <span className="font-medium text-gray-800">{value}</span>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isDataReady && (
        <div className="min-h-screen bg-gray-100 p-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-4xl"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-2xl font-bold text-gray-800"
            >
              General Information
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-white p-8 shadow-lg"
            >
              <motion.div
                variants={itemVariants}
                className="relative mx-auto mb-8 w-fit"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={initialValues?.fileUpload || ""}
                    alt="Profile"
                    className="h-48 w-48 rounded-full border-4 border-gray-100 object-cover shadow-lg"
                  />
                  <button
                    onClick={() => navigate(BaseUrl.EditProfile)}
                    className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-lg transition-shadow hover:shadow-xl"
                  >
                    <Pencil className="h-5 w-5 text-gray-600" />
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <InfoItem label="Name" value={initialValues.fullName} />
                <InfoItem label="Email" value={initialValues.email} />
                <InfoItem label="Phone" value={initialValues.phoneNumber} />
                <InfoItem
                  label="Province"
                  value={initialValues.ProvinceID || ""}
                />
                <InfoItem
                  label="District"
                  value={initialValues.DistrictID || ""}
                />
                <InfoItem label="Ward" value={initialValues.WardID || ""} />
                <InfoItem
                  label="Detail Address"
                  value={initialValues.addressDetail}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
