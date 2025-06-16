"use client";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import useCreateUser from "@/hooks/user/useCreateUser";
import createUserValidationSchema from "@/validations/createUserValidationSchema";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import UserProfile from "./UserProfile";
import { CreateUserForm } from "@/components/forms";
const CreateUser = () => {
  const { loadingCreateUser, errorCreateUser, createUser } = useCreateUser();
  const [profileImg, setProfileImg] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      role: "",
      department: "",
      designation: "",
      phone: "",
      employeeId: "",
      dateOfBirth: "",
    },
    validationSchema: createUserValidationSchema,
    onSubmit: async (values) => {
      handleCreateUser(values);
    },
  });
  const handleCreateUser = async (values) => {
    const isSuccess = await createUser(values, profileImg?.file);
    if (isSuccess) {
      formik.resetForm();
      setProfileImg(null);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg({ imageUrl, file });
    }
  };
  return (
    <>
      <Box className="createUser__container">
        <Box
          sx={{
            padding: "8px 40px 64px 40px",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={"20px"}
              color="#1C252E"
              variant="h6"
              fontWeight={700}
            >
              Create a new user
            </Typography>
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Box display={"flex"}>
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Box
                      sx={{
                        flexGrow: 0,
                        flexBasis: "auto",
                        minWidth: "0px",
                        p: 3,
                      }}
                    >
                      <UserProfile
                        handleFileChange={handleFileChange}
                        profileImg={profileImg}
                      />
                    </Box>
                  </Grid>
                  <Grid size={8}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        position: "relative",
                        zIndex: 0,
                        overflow: "hidden",
                        borderRadius: 2,
                        p: 3,
                        flexGrow: 0,
                        flexBasis: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          background: "#FFFFFF",
                          color: "#1C252E",
                          position: "relative",
                          boxShadow:
                            "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
                          zIndex: 0,
                          padding: "80px 40px 24px 24px",
                          overflow: "hidden",
                          borderRadius: "16px",
                        }}
                      >
                        <Box>
                          {
                            <CreateUserForm
                              formik={formik}
                            />
                          }
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            mt={1}
                          >
                            {errorCreateUser && (
                              <Typography
                                width={"100%"}
                                color="red"
                                fontSize={12}
                              >
                                {errorCreateUser}
                              </Typography>
                            )}
                            <MyButton
                              type="submit"
                              disabled={loadingCreateUser}
                            >
                              Create user
                            </MyButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateUser;
