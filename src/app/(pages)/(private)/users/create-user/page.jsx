"use client";
import UserDetailsForm from "@/app/(pages)/(public)/signup/UserDetailsForm";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import useCreateUser from "@/hooks/projects/user/useCreateUser";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const CreateUser = () => {
  const {loadingCreateUser,errorCreateUser,createUser} = useCreateUser();
  const [profileImg,setProfileImg] = useState(null);
  const formik = useFormik({
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

      handleCreateUser(values);
    },
  });
  const handleCreateUser = async (values) => {
    console.log("::values in create user", values);
    await createUser(values);
    if(!!errorCreateUser){
      formik.resetForm();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
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
                        <Box mb={5}>
                          <Box
                            padding={1}
                            margin={"auto"}
                            width={144}
                            height={144}
                            sx={{ cursor: "pointer" }}
                            overflow={"hidden"}
                            borderRadius={"50%"}
                            border={"1px dashed rgba(145,158,171,0.2)"}
                          >
                            <label htmlFor="upload-input">
                              <input
                                id="upload-input"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFileChange(e)}
                              />
                              <Box
                                width={"100%"}
                                height={"100%"}
                                overflow={"hidden"}
                                borderRadius={"50%"}
                                position={"relative"}
                                sx={{cursor:'pointer'}}
                              >
                                {
                                  profileImg ? (
                                    <Box
                                  sx={{
                                    top: "0px",
                                    left: "0px",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 9,
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "absolute",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#919EAB",
                                    background: "rgba(145,158,171,0.08)",
                                    gap: 1,
                                    borderRadius: "50%",
                                  }}
                                >
                                  <img
                                    src={profileImg}
                                    alt="profile img"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      flexShrink: 0,
                                      objectFit:'cover',
                                      textIndent:"10000px",
                                    }}
                                  />
                                </Box>
                                  ) : (<Box
                                    sx={{
                                      top: "0px",
                                      left: "0px",
                                      width: "100%",
                                      height: "100%",
                                      zIndex: 9,
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "#919EAB",
                                      background: "rgba(145,158,171,0.08)",
                                      gap: 1,
                                      borderRadius: "50%",
                                    }}
                                  >
                                    <img
                                      src="/addProfileIcon.svg"
                                      alt="add profile"
                                      style={{
                                        width: "32px",
                                        height: "32px",
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography fontSize={12} color="#919EAB">
                                      Upload photo
                                    </Typography>
                                  </Box>)
                                }
                              </Box>
                            </label>
                            
                          </Box>
                          <Box>
                            <Typography
                              marginInline={"auto"}
                              mt={3}
                              fontSize={12}
                              color="#919EAB"
                              textAlign={'center'}
                            >
                              Allowed *.jpeg, *.jpg, *.png, *.gif
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
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
                            <UserDetailsForm
                              formik={formik}
                              type={"create_user"}
                            />
                          }
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            mt={1}
                          >{
                            errorCreateUser && <Typography width={'100%'} color="red" fontSize={12}>{errorCreateUser}</Typography>
                          }
                            <MyButton type="submit" disabled={loadingCreateUser}>Create user</MyButton>
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
