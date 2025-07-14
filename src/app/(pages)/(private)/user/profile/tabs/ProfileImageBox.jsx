import CropImageDialog from "@/components/CropImageDialog";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRef, useState } from "react";

const ProfileImageBox = ({
  avatar,
  handleImageUpload,
  onDelete,
  isAdmin,
  loading,
  progress,
}) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCropComplete = (croppedBlob) => {
    setCropDialogOpen(false);
    handleImageUpload(croppedBlob);
  };

  const handleCropClose = () => {
    setSelectedImage(null);
    setCropDialogOpen(false);
  };

  return (
    <>
      <CropImageDialog
        imageSrc={selectedImage}
        open={cropDialogOpen}
        onClose={handleCropClose}
        onCropComplete={handleCropComplete}
      />
      <Box
        sx={{
          background: "#FFFFFF",
          color: "#1C252E",
          position: "relative",
          boxShadow:
            "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
          zIndex: 0,
          padding: isDownXs ? "8px" : "80px 24px 40px",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        <Box mb={5}>
          <Box
            padding={1}
            margin={"auto"}
            width={isDownXs ? 200 : 144}
            height={isDownXs ? 200 : 144}
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
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
              />
              <Box
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                borderRadius={"50%"}
                position={"relative"}
                sx={{ cursor: "pointer" }}
                className="parkash mishra"
              >
                {loading ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "#eee",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "8px",
                      pb: "2px",
                      gap: "4px",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        width: "28px !important",
                        height: "28px !important",
                        color: "#637381",
                      }}
                    />
                    <Typography variant="body2" fontSize={11}>
                      {progress}%
                    </Typography>
                  </Box>
                ) : avatar ? (
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
                      position: "relative",
                    }}
                  >
                    <img
                      src={avatar || "/dummyUser.svg"}
                      referrerPolicy="no-referrer"
                      alt="profile img"
                      style={{
                        width: "100%",
                        height: "100%",
                        flexShrink: 0,
                        objectFit: "cover",
                        textIndent: "10000px",
                      }}
                    />
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
                        background: "#141A21A3",
                        gap: 1,
                        borderRadius: "50%",
                        opacity: 0,
                        "&:hover": {
                          opacity: 1,
                        },
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
                    </Box>
                  </Box>
                ) : (
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
                  </Box>
                )}
              </Box>
            </label>
          </Box>
          <Box>
            <Typography
              marginInline={"auto"}
              mt={3}
              fontSize={12}
              color="#919EAB"
              textAlign={"center"}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
          </Box>
        </Box>
        {!isAdmin && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={3}
          >
            <Button
              onClick={onDelete}
              sx={{
                background: "rgba(255,86,48,0.16)",
                color: "#B71D18",
                fontWeight: 700,
                padding: "6px 12px",
                minWidth: 64,
                fontSize: 14,
                "&.Mui-disabled": {
                  color: "#B71D18",
                  background: "rgba(255,86,48,0.08)",
                  cursor: "not-allowed",
                },
              }}
            >
              Delete user
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
export default ProfileImageBox;
