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
import { formikInitialValues, getFormikCompatibleValues } from "./helper";
import editActiveUserValidationSchema from "@/validations/editActiveUserValidationSchema";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
export default function Profile() {
  const {fontSize} = useResponsiveValue();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState("general");
  const { state } = useAppContext();
  const { activeUser } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValues,
    validationSchema: editActiveUserValidationSchema,
    onSubmit: async (values) => {
    },
  });
  useEffect(() => {
    if (activeUser) {
      formik.setValues(getFormikCompatibleValues(activeUser));
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
          <BackButton fontSize={fontSize}/>
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
              activeUser={activeUser}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
