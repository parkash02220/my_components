"use client";

import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { useEffect, useState } from "react";
import useLogin from "@/hooks/projects/user/useLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import { useRouter } from "next/navigation";
import { loginUserWithGoogle } from "@/utils";
export default function SignIn() {
  const router = useRouter();
  const { isXs, isMd, isLg } = useBreakpointFlags();
  const { loadingLogin, loginUser, errorMsg, errorLogin } = useLogin();
  const [showPasswrod, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .min(6, "Password must be greater than 6 chars")
        .max(20, "Password must be less than 21 char")
        .required(),
    }),
    onSubmit: async (values) => {
      handleUserSignIn(values);
    },
  });
  const handleShowPasswrod = () => {
    setShowPassword(true);
  };
  const handleHidePasswrod = () => {
    setShowPassword(false);
  };
  const handleUserSignIn = async (userData) => {
    await loginUser(userData);
  };
  useEffect(() => {
    router.prefetch("/signup");
  }, []);
  const handleGoogleLogin = () => {
    loginUserWithGoogle(router);
  }
  return (
    <>
      <Box className="signInContainer" display={"flex"} minHeight={"100vh"}>
        {!isMd ? (
          <Box
            className="signInContainer__leftBox"
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
                Hi, Welcome back
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
              alt="signin image"
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
          className="signInContainer__rightBox"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMd ? "24px 16px 80px 16px" : "80px 16px 80px 16px",
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
              textAlign={isMd ? "center" : "left"}
            >
              <Typography
                variant="h5"
                fontSize={19}
                fontWeight={700}
                color="#1C252E"
              >
                Sign in to your account
              </Typography>
              <Box
                display={"flex"}
                gap={1}
                justifyContent={isMd ? "center" : ""}
              >
                <Typography fontSize={14} color="#637381">
                  Don’t have an account?
                </Typography>
                <Link href="/signup">
                  <Typography
                    fontSize={14}
                    color="#00A76F"
                    fontWeight={600}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Get started
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box>
              <Box>
                <MyButton variant="outlined" color="#1C252E" fullWidth={true} border={'2px solid #1C252E'} sx={{height:48}} borderRadius="8px" startIcon={<img src="/googleIcon.svg" alt="google" style={{width:"24px",height:"24px"}} />} hoverBgColor="whitesmoke" onClick={handleGoogleLogin}>Login with Google</MyButton>
              </Box>
              <Box display="flex" alignItems="center" my={2}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                  sx={{ mx: 2, whiteSpace: "nowrap" }}
                  color="textSecondary"
                >
                  or
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box display={"flex"} flexDirection={"column"}>
                <Grid container spacing={isXs ? 2 : 3}>
                  <Grid size={12}>
                    <MyTextField
                      name="email"
                      value={formik?.values?.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched?.email && Boolean(formik.errors?.email)
                      }
                      helperText={formik.errors?.email}
                      label="Email address"
                      minWidth="50px"
                      fullWidth={true}
                      borderRadius="8px"
                      borderColor="rgba(145,158,171,0.2)"
                      hoverBorderColor={"#1C252E"}
                      acitveBorder={"2px solid #1C252E"}
                      shrink={true}
                      labelColor="#637381"
                      activeLabelColor={"#1C252E"}
                      labelFontWeight={600}
                      color={"#1C252E"}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Box
                      display={"flex"}
                      justifyContent={"flex-end"}
                      mb={"12px"}
                    >
                      <Typography
                        color="#1C252E"
                        fontSize={14}
                        onClick={() => alert("forgot password button clicked")}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Box>
                    <MyTextField
                      type={showPasswrod ? "text" : "password"}
                      name="password"
                      value={formik?.values?.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched?.password &&
                        Boolean(formik.errors?.password)
                      }
                      helperText={formik.errors?.password}
                      label="Password"
                      minWidth="50px"
                      fullWidth={true}
                      borderRadius="8px"
                      borderColor="rgba(145,158,171,0.2)"
                      hoverBorderColor={"#1C252E"}
                      acitveBorder={"2px solid #1C252E"}
                      shrink={true}
                      labelColor="#637381"
                      activeLabelColor={"#1C252E"}
                      labelFontWeight={600}
                      placeholder="Password 6+"
                      color={"#1C252E"}
                      customEndAdornment={
                        showPasswrod ? (
                          <IconButton onClick={handleHidePasswrod}>
                            <img
                              src="/passwordShow.svg"
                              alt="hide pass"
                              style={{ width: "20px", height: "20px" }}
                            ></img>
                          </IconButton>
                        ) : (
                          <IconButton onClick={handleShowPasswrod}>
                            <img
                              src="/passwordHide.svg"
                              alt="hide pass"
                              style={{ width: "20px", height: "20px" }}
                            ></img>
                          </IconButton>
                        )
                      }
                    />
                  </Grid>
                  <Grid size={12}>
                    <MyButton
                      minWidth="50px"
                      fullWidth={true}
                      backgroundColor="#1C252E"
                      type="submit"
                      loading={loadingLogin}
                      loadingText={"Signing in..."}
                      padding={"8px 16px"}
                      borderRadius="8px"
                      fontSize={15}
                      fontWeight={700}
                      sx={{
                        height: "48px",
                      }}
                    >
                      Sign in
                    </MyButton>
                    {errorLogin && (
                      <Typography color="red" mt={1} ml={1} fontSize={12}>
                        {errorMsg}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
