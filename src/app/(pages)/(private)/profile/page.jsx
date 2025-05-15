"use client";

import { Box, Grid } from "@mui/system";
import { useFormik } from "formik";
import UserDetailsForm from "../../(public)/signup/UserDetailsForm";
import { Button, Typography } from "@mui/material";
import MyButton from "@/components/MyButton/MyButton";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ProfileImageBox from "./tabs/ProfileImageBox";
import { useAppContext } from "@/context/AppContext";
import ProfileHeader from "./ProfileHeader";
import GeneralTab from "./tabs/GeneralTab";
import SecurityTab from "./tabs/SecurityTab";
import { useNavigationInfo } from "@/hooks/common/useNavigationInfo";
export default function Profile() {
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
      avatar: "",
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
  const {parent,child} = useNavigationInfo({type:"userDrawerRoutes",path:"/profile"})
  useEffect(() => {
    if (activeUser) {
      formik.setValues({
        firstName: activeUser?.firstName || "",
        lastName: activeUser?.lastName || "",
        email: activeUser?.email || "",
        gender: activeUser?.gender || "",
        role: activeUser?.role || "",
        avatar: activeUser?.avatar || "",
      });
    }
  }, [activeUser]);

  return (
    <>
      <Box className="profile__container">
        <Box mb={5}>
            <ProfileHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        </Box>
       <Box>
        {
            selectedTab === "security" ? <SecurityTab /> : <GeneralTab formik={formik}/> 
        }
       </Box>
      </Box>
    </>
  );
}
