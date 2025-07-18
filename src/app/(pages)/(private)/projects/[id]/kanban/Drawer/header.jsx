import ConfirmationPopup from "@/components/ConfirmationPopup";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
import useDeleteTask from "@/hooks/projects/task/useDeleteTask";
import useEditTask from "@/hooks/projects/task/useEditTask";
import useMoveTask from "@/hooks/projects/task/useMoveTask";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as actions from "@/context/Task/action";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
export const Header = ({ activeTask, handleDrawer }) => {
  const { isDownXs,isDownSm } = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
  const { dispatch } = useTaskContext();
  const { loadingMoveTask, moveTask } = useMoveTask();
  const { loadingDeleteTask, errorDeleteTask, deleteTaskFromBackend } =
    useDeleteTask();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { loadingEditTask, errorEditTask, updateTaskInBackend } = useEditTask();
  const { state } = useProjectsContext();
  const { sections } = state?.activeProject;
  const [currentTask, setCurrentTask] = useState(activeTask);
  const [activeSections, setActiveSections] = useState([]);
  const [sectionOfActiveTask, setSectionOfActiveTask] = useState({});

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    setActiveSections(
      sections?.map((section) => ({
        id: section?.id,
        name: section?.name,
      }))
    );
    setCurrentTask(activeTask);
  }, [sections, activeTask]);

  useEffect(() => {
    if (activeSections.length && activeTask?.section_id) {
      const foundSection = activeSections.find(
        (section) => section.id === activeTask.section_id
      );
      setSectionOfActiveTask(foundSection || {});
    }
  }, [activeSections, activeTask]);

  const handleMenuItemClick = (section) => {
    const updatedActiveTask = {
      ...currentTask,
      section_id: section?.id,
      position: 1,
    };
    dispatch({
      type: actions.SET_ACTIVE_TASK_SUCCESS,
      payload: updatedActiveTask,
    });
    setSectionOfActiveTask(section);
    moveTask(currentTask?.id, section?.id, 1);
    handleMenuClose();
  };

  const handleTaskDeletion = async () => {
    await deleteTaskFromBackend(currentTask?.id, currentTask?.section_id);
    setOpenDeletePopup(false);
    handleDrawer();
  };

  return (
    <>
      <ConfirmationPopup
        type="delete"
        handleClose={() => setOpenDeletePopup(false)}
        open={openDeletePopup}
        submitAction={handleTaskDeletion}
        title={"Delete"}
        message={currentTask?.title || ""}
        loading={loadingDeleteTask}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"20px 8px 20px 20px"}
        borderBottom={"1px solid rgba(145 158 171 / 0.2)"}
        pl={isDownXs ? "8px" : ""}
        gap={1}
      >
        <Box display={"flex"} gap={isDownXs ? 0 : 1} alignItems={"center"} flex={'0 1 auto'} minWidth={0}>
          {isDownXs ? (
            <IconButton
              onClick={handleDrawer}
              sx={{
                color: "#637381",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink:0,
              }}
            >
              <img
                src="/closeSideBarArrow.svg"
                alt="close"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          ) : null}
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              cursor: "pointer",

              backgroundColor: "rgba(145,158,171,0.08)",
              height: "30px",
              padding: "6px 8px",
              borderWidth: "0px",
              borderRadius: "8px",
              flex:'0 1 auto',
              minWidth:0,
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);",
            }}
          >
            <Typography
            variant="primary"
              sx={{
                fontWeight: 700,
                whiteSpace:'nowrap',
                overflow:"hidden",
                textOverflow:"ellipsis",
              }}
            >
              {sectionOfActiveTask?.name}
            </Typography>{" "}
            <img
              src="/dropdown-arrow.svg"
              alt="drop down icon"
              style={{ width: "16px", height: "16px" }}
            />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
            {activeSections.map((section) => (
              <MenuItem
                key={section.id}
                onClick={() => handleMenuItemClick(section)}
                sx={{
                  backgroundColor: "transparent",
                  margin: "0px",
                  marginInline: "3px",
                  cursor: "pointer",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  minHeight: isDownXs ? "32px" : isDownSm ? "40px" : "48px",
                }}
              >
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  minWidth="140px"
                  mb={"4px"}
                >
                  <Typography variant="primary">
                    {section?.name || ""}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexShrink={0}>
          {/* <MyTooltip title={"Like"} placement="bottom">
            <IconButton
              sx={{
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "#00A76F",
                "&::hover": {
                  background: "rgba(0,167,111,0.08)",
                },
              }}
            >
              <img
                src="/like.svg"
                alt="like"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </MyTooltip> */}
          <MyTooltip title={"Delete task"} placement="bottom">
            <IconButton
              onClick={() => setOpenDeletePopup(true)}
              sx={{
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "#00A76F",
                "&::hover": {
                  background: "rgba(0,167,111,0.08)",
                },
              }}
            >
              <img
                src="/deleteIcon.svg"
                alt="delete"
                style={{ width: isDownXs ? "16px" : "20px", height: isDownXs ? "16px" :  "20px" }}
              />
            </IconButton>
          </MyTooltip>
          {/* <IconButton
            sx={{
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              color: "#00A76F",
              "&::hover": {
                background: "rgba(0,167,111,0.08)",
              },
            }}
          >
            <img
              src="/menuVerticalIcon.svg"
              alt="menu"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton> */}
        </Box>
      </Box>
    </>
  );
};
