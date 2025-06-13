import { Box, Typography } from "@mui/material";

const UserProfile = ({ handleFileChange, profileImg }) => {
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
                sx={{ cursor: "pointer" }}
              >
                {profileImg?.imageUrl ? (
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
                      src={profileImg?.imageUrl}
                      alt="profile img"
                      style={{
                        width: "100%",
                        height: "100%",
                        flexShrink: 0,
                        objectFit: "cover",
                        textIndent: "10000px",
                      }}
                    />
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
      </Box>
    </>
  );
};
export default UserProfile;
