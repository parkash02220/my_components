"use client";

import MyButton from "@/components/MyButton/MyButton";
import useSignUp from "@/hooks/user/activeUser/useSignUp";
import { loginUserWithGoogle } from "@/utils";
import { Box, Divider, Typography } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { SignUpForm } from "@/components/forms";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
const SignUp = () => {
  const router = useRouter();
  const { isDownMd, isDownXs } = useResponsiveBreakpoints();
  const { fontSize } = useResponsiveValue();
  const { loadingSignUp, errorSignUp, responseMsg, signUpUser } = useSignUp();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "First name should be bigger than 2 chars")
        .required("This field is required"),
      lastName: Yup.string(),
      email: Yup.string()
        .email("invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .min(6, "Password must be greater than 6 chars")
        .max(20, "Password must be less than 21 char")
        .required(),
      gender: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      handleUserSignUp(values);
    },
  });
  const handleUserSignUp = async (userData) => {
    await signUpUser(userData);
  };
  useEffect(() => {
    router.prefetch("/signin");
  }, []);
  const handleGoogleLogin = () => {
    loginUserWithGoogle(router);
  };
  return (
    <>
      <Box className="signUpContainer" display={"flex"} minHeight={"100dvh"}>
        {!isDownMd ? (
          <Box
            className="signUpContainer__leftBox"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={8}
            sx={{
              backgroundImage: `linear-gradient(0deg,rgba(255,255,255,0.92),rgba(255,255,255,0.92)),url(/backgroundBlur.webp)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              padding: "72px 24px 24px 24px",
              width: "100%",
              maxWidth: "480px",
              position: "relative",
            }}
          >
            <Box className="leftBox__headingBox">
              <Typography
                variant="h3"
                fontSize={30}
                color="#1C252E"
                fontWeight={700}
                textAlign={"center"}
              >
                Manage the job
              </Typography>
              <Typography
                margin={0}
                mt={2}
                color="#637381"
                textAlign={"center"}
              >
                More effectively with optimized workflows.
              </Typography>
            </Box>
            <img
              src="/signUpLeftImage.webp"
              alt="signup image"
              style={{ objectFit: "cover", aspectRatio: "4/3" }}
            />
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Box color={"#00A76F"}>
                <img
                  src="/signUpFooterIcon1.svg"
                  alt="icons"
                  style={{ width: "32px", height: "32px" }}
                />
              </Box>

              <Box color={"#00A76F"}>
                <img
                  src="/signUpFooterIconFirebase2.svg"
                  alt="icons"
                  style={{ width: "32px", height: "32px" }}
                />
              </Box>

              <Box color={"#00A76F"}>
                <img
                  src="/signUpFooterIcon3.svg"
                  alt="icons"
                  style={{ width: "32px", height: "32px" }}
                />
              </Box>

              <Box color={"#00A76F"}>
                <img
                  src="/signUpFooterIcon4.svg"
                  alt="icons"
                  style={{ width: "32px", height: "32px" }}
                />
              </Box>

              <Box color={"#00A76F"}>
                <img
                  src="/signUpFooterIcon5.svg"
                  alt="icons"
                  style={{ width: "32px", height: "32px" }}
                />
              </Box>
            </Box>
          </Box>
        ) : null}
        <Box
          className="signUpContainer__rightBox"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 16px 80px 16px",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            maxWidth={420}
            gap={2}
          >
            <Box
              mb={2}
              display={"flex"}
              flexDirection={"column"}
              whiteSpace={"pre-line"}
              gap={"12px"}
              textAlign={isDownMd ? "center" : "left"}
            >
              <Typography variant="title1" fontWeight={700}>
                Get started absolutely free
              </Typography>
              <Box
                display={"flex"}
                gap={1}
                justifyContent={isDownMd ? "center" : ""}
              >
                <Typography fontSize={fontSize} color="#637381">
                  Already have an account?
                </Typography>
                <Link href={"/signin"}>
                  <Typography
                    fontSize={fontSize}
                    color="#00A76F"
                    fontWeight={600}
                    sx={{ "&:hover": { textDecoration: "underline" } }}
                  >
                    Get started
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box>
              <Box>
                <MyButton
                  variant="outlined"
                  color="#1C252E"
                  fullWidth={true}
                  border={"2px solid #1C252E"}
                  borderRadius="8px"
                  sx={{ height: 48 }}
                  fontSize={fontSize}
                  startIcon={
                    <img
                      src="/googleIcon.svg"
                      alt="google"
                      style={{
                        width: isDownXs ? "20px" : "24px",
                        height: isDownXs ? "20px" : "24px",
                      }}
                    />
                  }
                  hoverBgColor="whitesmoke"
                  onClick={handleGoogleLogin}
                >
                  Sign up with Google
                </MyButton>
              </Box>
              <Box display="flex" alignItems="center" my={2}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                  sx={{ mx: 2, whiteSpace: "nowrap" }}
                  color="textSecondary"
                  fontSize={fontSize}
                >
                  or
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box display={"flex"} flexDirection={"column"}>
                {<SignUpForm formik={formik} />}
                <MyButton
                  minWidth="50px"
                  fullWidth={true}
                  backgroundColor="#1C252E"
                  type="submit"
                  loading={loadingSignUp}
                  loadingText={"Signing up..."}
                  padding={"8px 16px"}
                  borderRadius="8px"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: 13, sm: 14, lg: 16 },
                    height: "48px",
                    mt: 2,
                  }}
                >
                  Create account
                </MyButton>
                {responseMsg && (
                  <Typography
                    color="red"
                    mt={1}
                    ml={1}
                    fontSize={isDownXs ? 10 : 12}
                  >
                    {responseMsg}
                  </Typography>
                )}
                <Box mt={2}>
                  <Typography
                    color="#637381"
                    fontSize={isDownXs ? 10 : 12}
                    margin={"8px 0px 0px"}
                    textAlign={"center"}
                  >
                    By signing up, I agree to{" "}
                    <span style={{ color: "#1C252E" }}>Terms of service</span>{" "}
                    and <span style={{ color: "#1C252E" }}>Privacy policy</span>
                    .
                  </Typography>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default SignUp;
