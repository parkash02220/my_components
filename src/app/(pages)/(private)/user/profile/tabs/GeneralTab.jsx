import { Box, Button, Grid, Typography } from "@mui/material";
import ProfileImageBox from "./ProfileImageBox";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { getActiveUser } from "@/utils";
import useDeleteUser from "@/hooks/user/useDeleteUser";
import { useEffect, useState } from "react";
import useDeleteActiveUser from "@/hooks/user/activeUser/useDeleteActiveUser";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import useUpdateActiveUser from "@/hooks/user/activeUser/useUpdateActiveUser";
import useUploadProfileImage from "@/hooks/user/activeUser/useUploadProfileImage";
import _ from "lodash";
import { getFormikCompatibleValues } from "../helper";
import useToast from "@/hooks/common/useToast";
import { EditProfileForm } from "@/components/forms";
const GeneralTab = ({ formik, isAdmin, avatar,activeUser }) => {
  const {showToast} = useToast();
  const { uploadProfileImage, loadingUploadProfile, progress } =
    useUploadProfileImage();
  const { loadingUpdateActiveUser, errorUpdateActiveUser, updateActiveUser } =
    useUpdateActiveUser();
  const [imgSrc, setImgSrc] = useState(null);
  const { loadingDeleteActiveUser, errorDeleteActiveUser, deleteActiveUser } =
    useDeleteActiveUser();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleUpdateUser = async () => {
    const originalDetails = getFormikCompatibleValues(activeUser);
    if(_.isEqual(originalDetails,formik.values)){
      showToast({type:"info",message:"No changes found."});
      return;
    }
    await updateActiveUser(formik.values);
  };

  const handleMenuDeleteButton = async () => {
    await deleteActiveUser();
    handleDeletePopupClose();
  };
  const handleDeletePopupOpen = () => {
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  useEffect(() => {
    setImgSrc(avatar);
  }, [avatar]);

  const handleImageUpload = async (imgFile) => {
    if (imgFile) {
      const uploadedUrl = await uploadProfileImage(imgFile);
      if (uploadedUrl) {
        setImgSrc(uploadedUrl);
        formik.setFieldValue("avatar", uploadedUrl);
      }
    }
  };
  return (
    <>
      <ConfirmationPopup
        title={"Delete user"}
        handleClose={handleDeletePopupClose}
        open={deletePopupOpen}
        message={"user"}
        type={"delete"}
        submitAction={handleMenuDeleteButton}
        loading={loadingDeleteActiveUser}
      />
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
                  <ProfileImageBox
                    avatar={imgSrc}
                    handleImageUpload={handleImageUpload}
                    onDelete={handleDeletePopupOpen}
                    isAdmin={isAdmin}
                    loading={loadingUploadProfile}
                    progress={progress}
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
                        <EditProfileForm
                          formik={formik}
                        />
                      }
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        mt={2}
                      >
                        {
                          // errorCreateUser && <Typography width={'100%'} color="red" fontSize={12}>{errorCreateUser}</Typography>
                        }
                        <Button
                          onClick={handleUpdateUser}
                          type="submit"
                          disabled={loadingUpdateActiveUser}
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
                              cursor: "not-allowed",
                            },
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
        </Box>
      </Box>
    </>
  );
};
export default GeneralTab;
