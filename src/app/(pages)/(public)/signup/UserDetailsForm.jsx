import MyTextField from "@/components/MyTextfield/MyTextfield";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

const UserDetailsForm = ({ formik, type }) => {
  const { isXs } = useBreakpointFlags();
  const [showPasswrod, setShowPassword] = useState(false);
  const handleShowPasswrod = () => {
    setShowPassword(true);
  };
  const handleHidePasswrod = () => {
    setShowPassword(false);
  };
  if (type === "signup") {
    return (
      <>
        <Grid container spacing={isXs ? 2 : 3}>
          <Grid size={6}>
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
            />
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="lastName"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched?.lastName && Boolean(formik.errors?.lastName)
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
              color={"#1C252E"}
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
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Male"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Female"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
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
            />
          </Grid>
          <Grid size={12}>
            <MyTextField
              type={showPasswrod ? "text" : "password"}
              name="password"
              value={formik?.values?.password}
              onChange={formik.handleChange}
              error={
                formik.touched?.password && Boolean(formik.errors?.password)
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
        </Grid>
      </>
    );
  } else if (type === "create_user") {
    return (
      <>
        <Grid container spacing={isXs ? 2 : 3}>
          <Grid size={12}>
            <Typography color="#1C252E" fontWeight={700}>
              Basic details :
            </Typography>
          </Grid>
          <Grid size={6}>
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
            />
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="lastName"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched?.lastName && Boolean(formik.errors?.lastName)
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
              color={"#1C252E"}
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
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Male"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Female"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
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
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Admin"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="user"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="User"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
              </RadioGroup>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error" fontSize={12}>
                  {formik.errors.role}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Typography color="#1C252E" fontWeight={700}>
              Other details :
            </Typography>
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="department"
              value={formik?.values?.department}
              onChange={formik.handleChange}
              error={
                formik.touched?.department && Boolean(formik.errors?.department)
              }
              helperText={formik.errors?.department}
              label="Department"
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
          <Grid size={6}>
            <MyTextField
              name="designation"
              value={formik?.values?.designation}
              onChange={formik.handleChange}
              error={
                formik.touched?.designation &&
                Boolean(formik.errors?.designation)
              }
              helperText={formik.errors?.designation}
              label="Designation"
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
          <Grid size={6}>
            <MyTextField
              name="phone"
              value={formik?.values?.phone}
              onChange={formik.handleChange}
              error={formik.touched?.phone && Boolean(formik.errors?.phone)}
              helperText={formik.errors?.phone}
              label="Phone number"
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
          <Grid size={6}>
            <MyTextField
              name="employeeId"
              value={formik?.values?.employeeId}
              onChange={formik.handleChange}
              error={
                formik.touched?.employeeId && Boolean(formik.errors?.employeeId)
              }
              helperText={formik.errors?.employeeId}
              label="EmployeeId"
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
          <Grid size={6}>
            <MyTextField
              name="dateOfBirth"
              value={formik?.values?.dateOfBirth}
              onChange={formik.handleChange}
              error={
                formik.touched?.dateOfBirth &&
                Boolean(formik.errors?.dateOfBirth)
              }
              helperText={formik.errors?.dateOfBirth}
              label="Date of birth"
              type="date"
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
        </Grid>
      </>
    );
  } else if (type === "update_user") {
    return (
      <>
        <Grid container spacing={isXs ? 2 : 3}>
          <Grid size={12}>
            <Typography color="#1C252E" fontWeight={700}>
              Basic details :
            </Typography>
          </Grid>
          <Grid size={6}>
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
            />
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="lastName"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched?.lastName && Boolean(formik.errors?.lastName)
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
              color={"#1C252E"}
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
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Male"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Female"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
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
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Admin"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="user"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="User"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
              </RadioGroup>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error" fontSize={12}>
                  {formik.errors.role}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Typography color="#1C252E" fontWeight={700}>
              Other details :
            </Typography>
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="department"
              value={formik?.values?.department}
              onChange={formik.handleChange}
              error={
                formik.touched?.department && Boolean(formik.errors?.department)
              }
              helperText={formik.errors?.department}
              label="Department"
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
          <Grid size={6}>
            <MyTextField
              name="designation"
              value={formik?.values?.designation}
              onChange={formik.handleChange}
              error={
                formik.touched?.designation &&
                Boolean(formik.errors?.designation)
              }
              helperText={formik.errors?.designation}
              label="Designation"
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
          <Grid size={6}>
            <MyTextField
              name="phone"
              value={formik?.values?.phone}
              onChange={formik.handleChange}
              error={formik.touched?.phone && Boolean(formik.errors?.phone)}
              helperText={formik.errors?.phone}
              label="Phone number"
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
          <Grid size={6}>
            <MyTextField
              name="employeeId"
              value={formik?.values?.employeeId}
              onChange={formik.handleChange}
              error={
                formik.touched?.employeeId && Boolean(formik.errors?.employeeId)
              }
              helperText={formik.errors?.employeeId}
              label="EmployeeId"
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
          <Grid size={6}>
            <MyTextField
              name="dateOfBirth"
              value={formik?.values?.dateOfBirth}
              onChange={formik.handleChange}
              error={
                formik.touched?.dateOfBirth &&
                Boolean(formik.errors?.dateOfBirth)
              }
              helperText={formik.errors?.dateOfBirth}
              label="Date of birth"
              type="date"
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
        </Grid>
      </>
    );
  } else if (type === "edit_profile") {
    return (
      <>
        <Grid container spacing={isXs ? 2 : 3}>
          <Grid size={6}>
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
            />
          </Grid>
          <Grid size={6}>
            <MyTextField
              name="lastName"
              value={formik?.values?.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched?.lastName && Boolean(formik.errors?.lastName)
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
              color={"#1C252E"}
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
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Male"
                  sx={{
                    mr: 4,
                    "& .MuiTypography-root": {
                      fontSize: 14,
                      color: "#637381",
                    },
                  }}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                  }
                  label="Female"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 14,
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

          {/* <Grid size={12}>
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
          />
        </Grid> */}
          {/* <Grid size={12}>
        <FormControl
            component="fieldset"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <RadioGroup
              row
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="admin"
                control={
                  <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                }
                label="Admin"
                sx={{
                  mr: 4,
                  "& .MuiTypography-root": {
                    fontSize: 14,
                    color: "#637381",
                  },
                }}
              />
              <FormControlLabel
                value="user"
                control={
                  <Radio sx={{ fontSize: 18, transform: "scale(0.8)" }} />
                }
                label="User"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 14,
                    color: "#637381",
                  },
                }}
              />
            </RadioGroup>
            {formik.touched.role && formik.errors.role && (
              <Typography color="error" fontSize={12}>
                {formik.errors.role}
              </Typography>
            )}
          </FormControl>
        </Grid> */}
        </Grid>
      </>
    );
  }
};
export default UserDetailsForm;
