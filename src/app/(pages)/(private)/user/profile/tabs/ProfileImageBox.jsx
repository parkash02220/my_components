import { Box, Button, Typography } from "@mui/material";

const ProfileImageBox = ({ avatar, handleImageUpload, onDelete,isAdmin }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleImageUpload(imageUrl);
    }
  };
  return (
    <>
      <Box
        sx={{
          background: "#FFFFFF",
          color: "#1C252E",
          position: "relative",
          boxShadow:
            "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
          zIndex: 0,
          padding: "80px 24px 40px",
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
                sx={{ cursor: "pointer" }}
              >
                {avatar ? (
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
                      src={avatar}
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
      { !isAdmin &&  <Box
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
        </Box>}
      </Box>
    </>
  );
};
export default ProfileImageBox;
