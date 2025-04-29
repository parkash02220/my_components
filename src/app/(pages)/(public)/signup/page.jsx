"use client";

import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import useSignUp from "@/hooks/projects/user/useSignUp";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
const SignUp = () => {
    const {loadingSignUp,errorSignUp,responseMsg,signUpUser} = useSignUp();
    const [showPasswrod,setShowPassword] = useState(false);
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
    onSubmit:async (values) => {
            handleUserSignUp(values);
    },
  });
  const handleShowPasswrod= () => {
    setShowPassword(true);
  }
  const handleHidePasswrod= () => {
    setShowPassword(false);
  }
  const handleUserSignUp = async (userData) => {
    await signUpUser(userData);
  }
  return (
    <>
      <Box className="signUpContainer" display={"flex"} minHeight={"100vh"}>
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
            <Typography margin={0} mt={2} color="#637381" textAlign={"center"}>
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
          >
            <Box
              mb={5}
              display={"flex"}
              flexDirection={"column"}
              whiteSpace={"pre-line"}
              gap={"12px"}
              textAlign={"left"}
            >
              <Typography
                variant="h5"
                fontSize={19}
                fontWeight={700}
                color="#1C252E"
              >
                Get started absolutely free
              </Typography>
              <Box display={"flex"} gap={1}>
                <Typography fontSize={14} color="#637381">
                  Already have an account?
                </Typography>
                <Link href={'/signin'} >
                <Typography fontSize={14} color="#00A76F" fontWeight={600} sx={{'&:hover':{textDecoration:'underline'}}}>
                  Get started
                </Typography>
                </Link>
              </Box>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Box display={"flex"} flexDirection={"column"}>
                <Grid container spacing={3}>
                  <Grid size={6}>
                    <MyTextField
                      name="firstName"
                      value={formik?.values?.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched?.firstName &&
                        Boolean(formik.errors?.firstName)
                      }
                      helperText={formik.errors?.firstName}
                      label="First name"
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
                    />
                  </Grid>
                  <Grid size={6}>
                    <MyTextField
                      name="lastName"
                      value={formik?.values?.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched?.lastName &&
                        Boolean(formik.errors?.lastName)
                      }
                      helperText={formik.errors?.lastName}
                      label="Last name"
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
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl
                      component="fieldset"
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* <FormLabel
                        component="legend"
                        sx={{
                          color: "#637381",
                          fontWeight: 600,
                          fontSize: 14,
                          marginRight: 2,
                        }}
                      >
                        Gender
                      </FormLabel> */}
                      <RadioGroup
                        row
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Box display={'flex'} alignItems={'center'} mr={2}>
                            <Typography  sx={{
                          color: "#637381",
                          fontWeight: 600,
                          fontSize: 14,
                        }}>Gender</Typography>
                        </Box>
                        <FormControlLabel
                          value="male"
                          control={<Radio sx={{ fontSize: 18,transform: "scale(0.8)" }} />}
                          label="Male"
                          sx={{
                            mr: 4,
                            "& .MuiTypography-root": {
                              fontSize: 14,
                              color:"#637381",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio sx={{ fontSize: 18,transform: "scale(0.8)" }} />}
                          label="Female"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: 14,
                              color:"#637381",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio sx={{ fontSize: 18,transform: "scale(0.8)" }} />}
                          label="Other"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: 14,
                              color:"#637381",
                            },
                          }}
                        />
                      </RadioGroup>
                      {formik.touched.gender && formik.errors.gender && (
                        <Typography color="error" fontSize={12}>
                          {formik.errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

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
                    />
                  </Grid>
                  <Grid size={12}>
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
                      loading={loadingSignUp}
                      loadingText={"Signing up..."}
                      padding={'8px 16px'}
                      borderRadius="8px"
                      fontSize={15}
                      fontWeight={700}
                      sx={{
                        height:"48px",
                      }}
                    >
                      Create account
                    </MyButton>
                    {
                        responseMsg && <Typography color="red" mt={1} ml={1} fontSize={12}>{responseMsg}</Typography>
                    }
                  </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography
                      color="#637381"
                      fontSize={12}
                      margin={"8px 0px 0px"}
                      textAlign={"center"}
                    >
                      By signing up, I agree to{" "}
                      <span style={{ color: "#1C252E" }}>Terms of service</span>{" "}
                      and{" "}
                      <span style={{ color: "#1C252E" }}>Privacy policy</span>.
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
