import { Box, Button, Grid, Typography } from "@mui/material";
import ProfileImageBox from "./ProfileImageBox";
import UserDetailsForm from "../../../(public)/signup/UserDetailsForm";

const GeneralTab = ({ formik }) => {
    const handleImageUpload=(img)=>{
      if(img){
        formik.setFieldValue("avatar",img);
      }
    }
  return (
    <>
      <Box
        sx={{
          padding: "8px 40px 64px 40px",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
        }}
      >
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
                    <ProfileImageBox avatar={formik?.values?.avatar} handleImageUpload={handleImageUpload}/>
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
                            type={"edit_profile"}
                          />
                        }
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"flex-end"}
                          mt={1}
                        >
                          {
                            // errorCreateUser && <Typography width={'100%'} color="red" fontSize={12}>{errorCreateUser}</Typography>
                          }
                          <Button
                            type="submit"
                            sx={{
                              fontWeight: 700,
                              padding: "6px 12px",
                              minWidth: 64,
                              fontSize: 14,
                              color: "#FFFFFF",
                              background: "#1C252E",
                            }}
                          >
                            Save changes
                          </Button>
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
    </>
  );
};
export default GeneralTab;
