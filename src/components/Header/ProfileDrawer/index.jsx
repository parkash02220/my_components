import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";

import RightDrawer from "@/components/RightDrawer";
import useLogout from "@/hooks/user/activeUser/useLogout";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import { useAppContext } from "@/context/App/AppContext";
import { useRouter } from "next/navigation";
import userDrawerRoutes from "@/routes/userDrawerRoutes";
const ProfileDrawer = ({ open, handleDrawer }) => {
  const { state } = useAppContext();
  const { activeUser } = state;
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const { loadingLogout, logoutUser } = useLogout();
  const router = useRouter();
  const handleLogoutOpen = () => {
    setLogoutPopupOpen(true);
  };
  const handleLogoutClose = () => {
    setLogoutPopupOpen(false);
  };
  const handleNavigation = (path) => {
    if (!path) return;
    router.push(path);
    handleDrawer();
  };
  return (
    <>
      <ConfirmationPopup
        title={"Logout"}
        handleClose={handleLogoutClose}
        open={logoutPopupOpen}
        type={"logout"}
        loading={loadingLogout}
        submitAction={logoutUser}
      />
      <Box>
        <RightDrawer
          open={open}
          handleDrawer={handleDrawer}
          width={320}
          children={
            <Box>
              {/* <IconButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                  fontSize: "24px",
                  textAlign: "center",
                  color: "#637381",
                  top: "12px",
                  left: "12px",
                  zIndex: 9,
                  position: "absolute",
                  margin: 0,
                  padding: "8px",
                  flex: "0 0 auto",
                  borderRadius: "50%",
                }}
                onClick={handleDrawer}
              >
                <img
                  src="/closeDrawerIcon.svg"
                  alt="close"
                  style={{ width: "100%", height: "20px", flexShrink: 0 }}
                />
              </IconButton> */}
              <Box
                sx={{
                  pt: 8,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    minWidth: "unset",
                    minHeight: "unset",
                    overflow: "hidden",
                    position: "relative",
                    padding: "6px",
                    borderRadius: "50%",
                    width: { xs: "75px", sm: "96px" },
                    height: { xs: "75px", sm: "96px" },
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "initial",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      color: "#00A76F",
                      padding: "1px",
                      inset: "0px",
                      margin: "auto",
                      borderRadius: "inherit",
                      animation: "rotateClockwise 5s linear infinite",
                      WebkitMaskImage:
                        "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                      WebkitMaskComposite: "xor", // for WebKit browsers (Chrome/Safari)
                      maskImage:
                        "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                      maskComposite: "exclude", // Firefox supports 'exclude' instead of 'xor'
                    }}
                  >
                    <img
                      src="/animationSvgWrapper.svg"
                      alt="wrapper"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Typography
                      sx={{
                        transform:
                          "translateX(32.1081px) translateY(0.725105px) translateX(-50%) translateY(-50%)",
                        width: "100px",
                        height: "100px",
                        filter: "blur(8px)",
                        position: "absolute",
                        background:
                          "radial-gradient(#00A76F 40%, transparent 80%)",
                      }}
                    ></Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "initial",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      transform: "scale(-1, -1)",
                      color: "#FFAB00",
                      padding: "1px",
                      inset: "0px",
                      margin: "auto",
                      borderRadius: "50%",
                      // animation: "rotateCounterClockwise 7s linear infinite",
                      animation: "rotateClockwise 5s linear infinite",
                      WebkitMaskImage:
                        "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                      WebkitMaskComposite: "xor", // for WebKit browsers (Chrome/Safari)
                      maskImage:
                        "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                      maskComposite: "exclude", // Firefox supports 'exclude' instead of 'xor'
                    }}
                  >
                    <img
                      src="/animationSvgWrapper.svg"
                      alt="wrapper"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Typography
                      sx={{
                        transform:
                          "translateX(32.1081px) translateY(0.725105px) translateX(-50%) translateY(-50%)",
                        width: "100px",
                        height: "100px",
                        filter: "blur(8px)",
                        position: "absolute",
                        background:
                          "radial-gradient(#FFAB00 40%, transparent 80%)",
                      }}
                    ></Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "20px",
                      lineHeight: 1,
                      borderRadius: "50%",
                      overflow: "hidden",
                      userSelect: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={activeUser?.avatar || "/dummyUser.svg"}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        textIndent: "1000px",
                      }}
                    />
                  </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'} width={'100%'} paddingInline={'8px'}>
                  <Typography
                    sx={{
                      margin: 0,
                      mt: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      
                    }}
                    variant="title1"
                  >
                    {`${activeUser?.firstName || ""} ${
                      activeUser?.lastName || ""
                    }`}
                  </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'} width={'100%'} paddingInline={'8px'}>
                  <Typography
                    sx={{
                      margin: 0,
                      mt: "4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    variant="secondary"
                  >
                    {activeUser?.email || ""}
                  </Typography>
                </Box>
              </Box>
              {/* <Box
                sx={{
                  padding: 3,
                  gap: 1,
                  flexWrap: "wrap",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    fontSize: 20,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="	https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-2.webp"
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <MyTooltip title="Add account" placement="bottom">
                  <Box
                    position={"relative"}
                    width={40}
                    height={40}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"50%"}
                    fontSize={"1.25rem"}
                    overflow={"hidden"}
                    padding={"8px"}
                    border={"1px dashed rgba(145 158 171 / 0.2)"}
                    sx={{
                      cursor: "pointer",
                      background: "rgba(145,158,171,0.08)",
                      "&:hover": {
                        background: "rgba(99,115,129,0.08)",
                      },
                    }}
                  >
                    <img
                      src="/addAssignIcon.svg"
                      alt="add account"
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "transparent",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </MyTooltip>
              </Box> */}
              <Box
                sx={{
                  position: "relative",
                  padding: "24px 24px 20px 20px",
                  borderTop: "1px dashed rgba(145,158,171,0.2)",
                  borderBottom: "1px dashed rgba(145,158,171,0.2)",
                  mt: 2,
                }}
              >
                {userDrawerRoutes?.map((item, index) => {
                  return (
                    <Box
                      onClick={() => handleNavigation(item?.path)}
                      mb={"4px"}
                      p={1}
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                      key={index}
                      sx={{
                        cursor: "pointer",
                        color: "#637381",
                        borderRadius: "6px",
                        "&:hover": {
                          color: "#1C252E",
                          background: "rgba(145,158,171,0.08)",
                        },
                      }}
                    >
                      <Box>
                        <img
                          src={item?.icon?.src}
                          alt={item?.icon?.alt}
                          style={{ width: "24px", height: "24px" }}
                        />
                      </Box>
                      <Typography variant="secondary">{item?.title}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          }
          footer={
            <Box padding={"20px"}>
              <Button
                fontWeight={500}
                fullWidth={true}
                variant="contained"
                color="#B71D18"
                padding={"6px 16px"}
                width="100%"
                onClick={handleLogoutOpen}
                sx={{
                  backgroundColor: "rgba(255,86,48,0.16)",
                  minWidth: "64px",
                  borderRadius: "8px",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                  "&:hover": {
                    backgroundColor: "rgba(255,86,48,0.32)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          }
        />
      </Box>
    </>
  );
};
export default ProfileDrawer;
