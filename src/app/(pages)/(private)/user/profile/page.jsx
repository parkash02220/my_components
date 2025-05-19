"use client";

import { Box, Grid } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAppContext } from "@/context/App/AppContext";
import ProfileHeader from "./ProfileHeader";
import GeneralTab from "./tabs/GeneralTab";
import SecurityTab from "./tabs/SecurityTab";
import { useNavigationInfo } from "@/hooks/common/useNavigationInfo";
import { useRouter, useSearchParams } from "next/navigation";
import { ExpandLess } from "@mui/icons-material";
import BackButton from "@/components/BackButton";
export default function Profile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState("general");
  const { state } = useAppContext();
  const { activeUser } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "First name should be bigger than 2 chars")
        .required("This field is required"),
      lastName: Yup.string(),
      email: Yup.string()
        .email("invalid email address")
        .required("This field is required"),
      role: Yup.string().required(),
      gender: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      console.log("::formik values", values);
    },
  });
  useEffect(() => {
    if (activeUser) {
      formik.setValues({
        firstName: activeUser?.firstName || "",
        lastName: activeUser?.lastName || "",
        email: activeUser?.email || "",
        gender: activeUser?.gender || "",
        role: activeUser?.role || "",
      });
    }
  }, [activeUser]);

  useEffect(() => {
    if (tab === "general" || tab === "security") {
      setSelectedTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    if (!tab) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("tab", "general");
      router.replace(`?${current.toString()}`);
    }
  }, []);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", newValue);
    router.push(`?${current.toString()}`);
  };

  return (
    <>
      <Box className="profile__container">
        <Box
          mb={5}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
        >
          <BackButton />
          <ProfileHeader
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </Box>
        <Box>
          {selectedTab === "security" ? (
            <SecurityTab />
          ) : (
            <GeneralTab
              formik={formik}
              isAdmin={activeUser?.isAdmin}
              avatar={activeUser?.avatar}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
