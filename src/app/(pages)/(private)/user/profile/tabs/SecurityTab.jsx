import MyTextField from "@/components/MyTextfield/MyTextfield";
import useChangePassword from "@/hooks/user/activeUser/useChangePassword";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const SecurityTab = () => {
  const {
    loadingChangePassword,
    errorChangePassword,
    changePassword,
} = useChangePassword();
  const [showPasswrod, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Minimum length for password is 6")
        .max(20, "Max length for password is 20")
        .required("Old password is required"),
      newPassword: Yup.string()
        .min(6, "Minimum length for password is 6")
        .max(20, "Max length for password is 20")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .min(6, "Minimum length for password is 6")
        .max(20, "Max length for password is 20")
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit:async (values) => {
     const isSuccess = await changePassword(values);
     if(isSuccess){
      formik.resetForm();
     }
    },  
  });
  const handleShowPasswrod = () => {
    setShowPassword(true);
  };
  const handleHidePasswrod = () => {
    setShowPassword(false);
  };
  return (
    <>
      <Box
        p={3}
        borderRadius={2}
        boxShadow={
          "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)"
        }
      >
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <MyTextField
              type={showPasswrod ? "text" : "password"}
              name="oldPassword"
              value={formik?.values?.oldPassword}
              onChange={formik.handleChange}
              error={
                formik.touched?.oldPassword &&
                Boolean(formik.errors?.oldPassword)
              }
              helperText={formik.errors?.oldPassword}
              label="Old password"
              minWidth="50px"
              fullWidth={true}
              borderRadius="8px"
              borderColor="rgba(145,158,171,0.2)"
              hoverBorderColor={"#1C252E"}
              acitveBorder={"2px solid #1C252E"}
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
            <MyTextField
              type={showPasswrod ? "text" : "password"}
              name="newPassword"
              value={formik?.values?.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched?.newPassword &&
                Boolean(formik.errors?.newPassword)
              }
              helperText={formik.errors?.newPassword}
              label="New password"
              minWidth="50px"
              fullWidth={true}
              borderRadius="8px"
              borderColor="rgba(145,158,171,0.2)"
              hoverBorderColor={"#1C252E"}
              acitveBorder={"2px solid #1C252E"}
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
            <MyTextField
              type={showPasswrod ? "text" : "password"}
              name="confirmPassword"
              value={formik?.values?.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched?.confirmPassword &&
                Boolean(formik.errors?.confirmPassword)
              }
              helperText={formik.errors?.confirmPassword}
              label="Confirm password"
              minWidth="50px"
              fullWidth={true}
              borderRadius="8px"
              borderColor="rgba(145,158,171,0.2)"
              hoverBorderColor={"#1C252E"}
              acitveBorder={"2px solid #1C252E"}
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
          <Grid size={12} textAlign={'end'}>
            <Button
            disabled={loadingChangePassword}
              type="submit"
              sx={{
                fontWeight: 700,
                padding: "6px 12px",
                minWidth: 64,
                fontSize: 14,
                color: "#FFFFFF",
                background: "#1C252E",
                "&.Mui-disabled": {
                  color: "#FFFFFF",
                  background: "#1C252E",
                  opacity: 0.7,
                  cursor:'not-allowed',
                },
              }}
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
        </form>
      </Box>
    </>
  );
};
export default SecurityTab;
