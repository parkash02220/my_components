import { useRouter } from "next/navigation";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import AssignAllUsersDialog from "./AssignAllUsersDIalog/index";
import * as actions from "@/context/Projects/action";
import { useAppContext } from "@/context/App/AppContext";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
const {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} = require("@mui/material");
const {
  default: useUpdateProjectName,
} = require("@/hooks/projects/useUpdateProjectName");
const {
  default: useDeleteProject,
} = require("@/hooks/projects/useDeleteProject");
const { useState, useEffect, useRef } = require("react");

const HeaderProjectName = () => {
  const { isDownSm, isDownXs } = useResponsiveBreakpoints();
  const { fontSize } = useResponsiveValue();
  const { state, dispatch } = useProjectsContext();
  const { activeProject, loadingActiveProject } = state;
  const router = useRouter();
  const inputRef = useRef();
  const { activeUser } = useAppContext().state;
  const [showProjectNameTextfield, setShowProjectNameTextfield] =
    useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [openEditUsersPopup, setOpenEditUsersPopup] = useState(false);
  const handleClose = () => {
    setOpenEditUsersPopup(false);
  };
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
  const { loadingDeleteProject, errorDeleteProject, deleteProject } =
    useDeleteProject();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleProjectNameStartEdidting = () => {
    handleMenuClose();
    startEditing(activeProject?.name);
    setShowProjectNameTextfield(true);
  };
  const handleProjectNameBlur = () => {
    cancelEditing();
    setShowProjectNameTextfield(false);
  };

  const handleDeletePopupOpen = () => {
    handleMenuClose();
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  const handleDeleteProject = async () => {
    await deleteProject(activeProject?.id);
    setDeletePopupOpen(false);
    router.push("/home");
  };
  const handleEditUsers = () => {
    handleMenuClose();
    setOpenEditUsersPopup(true);
  };
  const handleChatStart = () => {
    router.push(`/projects/${activeProject?.id}?chat=true`);
    handleMenuClose();
  };
  const menuItems = [
    {
      label: "Rename",
      icon: "/rename.svg",
      onClick: handleProjectNameStartEdidting,
      role: ["admin"],
    },
    {
      label: "Edit users",
      icon: "/usersIcon.svg",
      onClick: handleEditUsers,
      role: ["admin"],
    },
    {
      label: "Chat",
      icon: "/chatIcon.svg",
      onClick: handleChatStart,
      role: ["admin", "user"],
    },
    {
      label: "Delete",
      icon: "/delete.svg",
      onClick: handleDeletePopupOpen,
      color: "#FF5630",
      role: ["admin"],
    },
  ];
  useEffect(() => {
    if (showProjectNameTextfield && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showProjectNameTextfield]);
  return (
    <>
      {openEditUsersPopup && (
        <AssignAllUsersDialog
          open={openEditUsersPopup}
          handleClose={handleClose}
          assignedUsers={activeProject?.user_id}
          projectId={activeProject?.id}
        />
      )}
      <ConfirmationPopup
        title={"Delete Project"}
        handleClose={handleDeletePopupClose}
        open={deletePopupOpen}
        message={activeProject?.name}
        type={"delete"}
        submitAction={handleDeleteProject}
        loading={loadingDeleteProject}
      />
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
                minWidth={isDownXs ? "100px" : "300px"}
                maxHeight={"44px"}
                loading={loadingUpdateProjectName}
                error={errorUpdateProjectName}
                // helperText={helperTextUpdateProjectName}
                acitveBorder={"2px solid #1C252E"}
                boxMargin={"8px 0px 0px 0px"}
              />
            ) : (
              <Typography
                variant="title1"
                fontWeight={700}
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
          horizontal: isDownXs ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isDownXs ? "right" : "left",
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
        {menuItems
          ?.filter((item) => item.role.some((r) => r === activeUser?.role))
          .map((item) => (
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
                minHeight: isDownXs ? 40 : 48,
              }}
            >
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                minWidth={isDownXs ? "130px" : "140px"}
                mb={isDownXs ? "" : "4px"}
              >
                <img
                  src={item.icon}
                  alt={item.label.toLowerCase()}
                  width={isDownXs ? 16 : 20}
                  height={isDownXs ? 16 : 20}
                />
                <Typography
                  fontSize={isDownXs ? 13 : 14}
                  color={item.color || "inherit"}
                >
                  {item.label}
                </Typography>
              </Box>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
export default HeaderProjectName;
