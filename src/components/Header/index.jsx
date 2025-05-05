"use client";

import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ProfileDrawer from "./ProfileDrawer";
import { useEffect, useRef, useState } from "react";
import useUpdateProjectName from "@/hooks/projects/useUpdateProjectName";
import { useAppContext } from "@/context/AppContext";
import MyTextField from "../MyTextfield/MyTextfield";
import ConfirmationPopup from "../ConfirmationPopup";
import useDeleteProject from "@/hooks/projects/useDeleteProject";
import { useRouter } from "next/navigation";
import useGetActiveUser from "@/hooks/projects/user/useGetActiveUser";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";

export default function Header({ profileDrawerOpen, setProfileDrawerOpen }) {
  const { state } = useAppContext();
  const {isMd,isSm,isXs} = useBreakpointFlags();
  const { activeProject,loading } = state;
  const {loadingActiveProject} = loading;
  const inputRef = useRef();
  const [showProjectNameTextfield, setShowProjectNameTextfield] =
    useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const {
    loadingUpdateProjectName,
    errorUpdateProjectName,
    helperTextUpdateProjectName,
    startEditing,
    cancelEditing,
    handleProjectInputChange,
    handleUpdateProjectName,
    handleProjectInputKeyDown,
    projectName,
  } = useUpdateProjectName(activeProject?.name, setShowProjectNameTextfield);

  const { activeUser, loadingActiveUser, errorActiveUser, fetchActiveUser } =
    useGetActiveUser();

  const { loadingDeleteProject, errorDeleteProject, deleteProject } =
    useDeleteProject();
  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const navigationItems = [
    // { image: { path: "/notificationIcon.svg", alt: "notification" } },
    // { image: { path: "/userIcon.svg", alt: "user" } },
    // {
    //   image: {
    //     path: "/settingsIcon.svg",
    //     alt: "settings",
    //     animation: "rotateClockwise 5s linear infinite",
    //   },
    // },
  ];

  const OpenProfileDrawer = () => {
    setProfileDrawerOpen(true);
  };
  const CloseProfileDrawer = () => {
    setProfileDrawerOpen(false);
  };

  const handleProjectNameStartEdidting = () => {
    handleMenuClose();
    startEditing(activeProject?.name);
    setShowProjectNameTextfield(true);
  };
  const handleDeletePopupOpen = () => {
    handleMenuClose();
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  const handleProjectNameBlur = () => {
    cancelEditing();
    setShowProjectNameTextfield(false);
  };
  const handleDeleteProject = async () => {
    await deleteProject(activeProject?.id);
    setDeletePopupOpen(false);
    router.push("/home");
  };
  useEffect(() => {
    if (showProjectNameTextfield && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showProjectNameTextfield]);

  const menuItems = [
    {
      label: "Rename",
      icon: "/rename.svg",
      onClick: handleProjectNameStartEdidting,
    },
    {
      label: "Delete",
      icon: "/delete.svg",
      onClick: handleDeletePopupOpen,
      color: "#FF5630",
    },
  ];
  return (
    <>
      <ConfirmationPopup
        title={"Delete Project"}
        handleClose={handleDeletePopupClose}
        open={deletePopupOpen}
        message={activeProject?.name}
        type={"delete"}
        submitAction={handleDeleteProject}
        loading={loadingDeleteProject}
      />
      <ProfileDrawer
        open={profileDrawerOpen}
        handleDrawer={CloseProfileDrawer}
      />
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{ borderBottom: "1px solid #eee", zIndex: 1101,width:isMd ? 'calc(100% - 60px)' : '100%',alignSelf:'flex-end' }}
      >
        <Box
          sx={{
            pl: isXs ? 0 : isMd ? 3 : 5,
            pr: isXs ? 0 : isMd ? 3 : 5,
            height: isXs ? "64px" : "75px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {activeProject?.name && !loadingActiveProject ? (
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Box>
                {showProjectNameTextfield ? (
                  <MyTextField
                    inputRef={inputRef}
                    label=""
                    name="projectName"
                    value={projectName || ""}
                    onChange={handleProjectInputChange}
                    onBlur={handleProjectNameBlur}
                    onKeyDown={(e) =>
                      handleProjectInputKeyDown(e, activeProject?.id)
                    }
                    minWidth="300px"
                    maxHeight={"44px"}
                    loading={loadingUpdateProjectName}
                    error={errorUpdateProjectName}
                    helperText={helperTextUpdateProjectName}
                    acitveBorder={"2px solid #1C252E"}
                    boxMargin={"8px 0px 0px 0px"}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    fontSize={isXs ? "1.125rem" : isSm ? "1.25rem" : "1.5rem"}
                    fontWeight={700}
                    color="#1C252E"
                    onClick={handleProjectNameStartEdidting}
                  >
                    {activeProject?.name}
                  </Typography>
                )}
              </Box>
              <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    padding: "0px",
                    width: "20px",
                    height: "20px",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  <img
                    src="/columnMenuIcon.svg"
                    alt="column menu icon"
                    width={"100%"}
                    height={"100%"}
                  />
                </IconButton>
              </Box>
            </Box>
          ) : null}
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: isXs ? "right" : "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal:isXs ? "right" : "left",
            }}
            PaperProps={{
              sx: {
                borderRadius: "10px",
                background: "#FFFFFFE6",
                boxShadow:
                  "0px 5px 5px -3px rgba(145 158 171 / 0.2),0px 8px 10px 1px rgba(145 158 171 / 0.14),0px 3px 14px 2px rgba(145 158 171 / 0.12)",
                color: "#1C252E",
                backgroundColor: "rgba(255,255,255)",
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={item.onClick}
                sx={{
                  backgroundColor: "transparent",
                  margin: "0px",
                  marginInline: "3px",
                  cursor: "pointer",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  minHeight: isXs ? 40 : 48,
                }}
              >
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  minWidth= {isXs ? "130px" : "140px"}
                  mb={isXs ? "" : "4px"}
                >
                  <img
                    src={item.icon}
                    alt={item.label.toLowerCase()}
                    width={isXs ? 16 : 20}
                    height={isXs ? 16 : 20}
                  />
                  <Typography fontSize={isXs ? 13 : 14} color={item.color || "inherit"}>
                    {item.label}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
                cursor: "pointer",
                // backgroundColor: "rgba(145,158,171,0.08)",
                borderRadius: "12px",
                gap: 1,
              }}
            >
              {/* <Box
                sx={{
                  p: 1,
                  display: "inline-flex",
                  color: "#637381",
                  cursor: "pointer1",
                  backgroundColor: "rgba(145,158,171,0.08)",
                  borderRadius: "inherit",
                }}
              >
                <img
                  src="/searchIcon.svg"
                  alt="search"
                  style={{ width: "20px", height: "20px", flexShrink: "0px" }}
                />
              </Box> */}
              {navigationItems?.map((item, index) => {
                return (
                  <IconButton
                    key={index}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxSizing: "border-box",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "24px",
                      color: "#637381",
                      outline: "0px",
                      borderWidth: "0px",
                      margin: "0px",
                      textDecoration: "none",
                      flex: "0 0 auto",
                      padding: "8px",
                      borderRadius: "50%",
                      animation: item?.image?.animation,
                      transition:
                        "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "rgba(99,115,129,0.08)",
                        scale: 1.2,
                      },
                    }}
                  >
                    <img
                      src={item?.image?.path}
                      alt={item?.image?.alt}
                      style={{
                        width: "24px",
                        height: "24px",
                        flexShrink: 0,
                        display: "inline-flex",
                      }}
                    />
                  </IconButton>
                );
              })}
              <IconButton
                onClick={OpenProfileDrawer}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                  fontSize: "24px",
                  color: "#637381",
                  outline: "0px",
                  borderWidth: "0px",
                  margin: "0px",
                  textDecoration: "none",
                  flex: "0 0 auto",
                  padding: "8px",
                  borderRadius: "50%",
                  transition:
                    "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: "rgba(99,115,129,0.08)",
                  },
                }}
              >
                {!loadingActiveUser && activeUser ? (
                  <Box
                    sx={{
                      minWidth: "unset",
                      minHeight: "unset",
                      overflow: "hidden",
                      position: "relative",
                      padding: "3px",
                      borderRadius: "50%",
                      width: isXs ? "36px" : "40px",
                      height: isXs ? "36px" : "40px",
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
                          width: "60px",
                          height: "60px",
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
                        color: "#FFABOO",
                        padding: "1px",
                        inset: "0px",
                        margin: "auto",
                        borderRadius: "50%",
                        animation: "rotateCounterClockwise 7s linear infinite",
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
                          width: "60px",
                          height: "60px",
                          filter: "blur(8px)",
                          position: "absolute",
                          background:
                            "radial-gradient(#FFABOO 40%, transparent 80%)",
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
                        src={activeUser?.avatar}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          textIndent: "1000px",
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      minWidth: "unset",
                      minHeight: "unset",
                      overflow: "hidden",
                      position: "relative",
                      padding: "3px",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      background: "#F4F4F4",
                      border: "1px dotted #1C252E",
                    }}
                  >
                    <img
                      src={"/dummyUser.svg"}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        textIndent: "1000px",
                      }}
                    />
                  </Box>
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
