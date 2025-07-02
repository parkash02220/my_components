import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import { useState } from "react";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
const SignUpForm = ({ formik }) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const { fontSize } = useResponsiveValue();
  const [showPasswrod, setShowPassword] = useState(false);
  const handleShowPasswrod = () => {
    setShowPassword(true);
  };
  const handleHidePasswrod = () => {
    setShowPassword(false);
  };

  return (
    <>
      <Grid container spacing={isDownXs ? 2 : 3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            name="firstName"
            value={formik?.values?.firstName}
            onChange={formik.handleChange}
            error={
              formik.touched?.firstName && Boolean(formik.errors?.firstName)
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
            color={"#1C252E"}
            inputFontSize={fontSize}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            name="lastName"
            value={formik?.values?.lastName}
            onChange={formik.handleChange}
            error={formik.touched?.lastName && Boolean(formik.errors?.lastName)}
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
            color={"#1C252E"}
            inputFontSize={fontSize}
          />
        </Grid>
        <Grid size={12}>
          <FormControl
            component="fieldset"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
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
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    sx={{
                      fontSize: isDownXs ? 14 : 18,
                      transform: "scale(0.8)",
                    }}
                  />
                }
                label="Male"
                sx={{
                  mr: 4,
                  "& .MuiTypography-root": {
                    fontSize: fontSize,
                    color: "#637381",
                  },
                }}
              />
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    sx={{
                      fontSize: isDownXs ? 14 : 18,
                      transform: "scale(0.8)",
                    }}
                  />
                }
                label="Female"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: fontSize,
                    color: "#637381",
                  },
                }}
              />
              {/* <FormControlLabel
                  value="other"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Other"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                /> */}
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
            error={formik.touched?.email && Boolean(formik.errors?.email)}
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
            inputFontSize={fontSize}
          />
        </Grid>
        <Grid size={12}>
          <MyTextField
            type={showPasswrod ? "text" : "password"}
            name="password"
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched?.password && Boolean(formik.errors?.password)}
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
                    style={{
                      width: isDownXs ? "16px" : "20px",
                      height: isDownXs ? "16px" : "20px",
                    }}
                  ></img>
                </IconButton>
              ) : (
                <IconButton onClick={handleShowPasswrod}>
                  <img
                    src="/passwordHide.svg"
                    alt="hide pass"
                    style={{
                      width: isDownXs ? "16px" : "20px",
                      height: isDownXs ? "16px" : "20px",
                    }}
                  ></img>
                </IconButton>
              )
            }
            inputFontSize={fontSize}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default SignUpForm;
