import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyTextField from "../MyTextfield/MyTextfield";
import useCreateTask from "@/hooks/projects/task/useCreateTask";
const BoardSection = ({
  id,
  sectionLabel,
  tasks,
  activeTaskId,
  overTaskId,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editedLabel, setEditedLabel] = useState(sectionLabel);
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const inputRef = useRef(null);
  const { newTaskName, handleTaskInputfieldChange, handleTaskInputKeyDown } =
    useCreateTask(id, setCreateTaskOpen);
  const { setNodeRef } = useDroppable({
    id,
  });
  const bottomPlaceholderId = `bottom-${id}`;
  const { setNodeRef: setBottomPlaceholderRef } = useDroppable({
    id: bottomPlaceholderId,
  });
  const isDragging = !!activeTaskId;
  const activeTask = tasks.find((t) => t?.id === activeTaskId);

  const ghostTask = useMemo(() => {
    if (isDragging && activeTask) {
      return {
        ...activeTask,
        id: `ghost-${activeTask.id}`, // stable and predictable ID
        isGhost: true,
      };
    }
    return null;
  }, [isDragging, activeTask?.id]);

  // Filter out active task (so it doesn't leave a gap)
  let filteredTasks = tasks;
  if (isDragging) {
    filteredTasks = tasks.filter((task) => task?.id !== activeTaskId);
  }

  let ghostIndex = -1;
  if (overTaskId === `bottom-${id}`) {
    ghostIndex = filteredTasks.length;
  } else {
    ghostIndex = filteredTasks.findIndex((task) => task?.id === overTaskId);
  }
  const enhancedTasks = [...filteredTasks];
  if (isDragging && ghostIndex !== -1 && ghostTask) {
    enhancedTasks.splice(ghostIndex, 0, ghostTask);
  }

  const handleCreateTaskOpen = () => {
    setCreateTaskOpen(true);
  };
  useEffect(() => {
    if (createTaskOpen && inputRef.current) {
      inputRef.current.querySelector("input")?.focus();
    }
  }, [createTaskOpen]);

  return (
    <>
      <Box sx={{ backgroundColor: "#eee", padding: 2, borderRadius: 2 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
          mb={2}
          mr={4}
        >
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography
              sx={{
                background: "#E4E8EB",
                color: "black",
                borderRadius: "50%",
                fontWeight: 700,
                fontSize: "12px",
              }}
            >
              {tasks?.length || 0}
            </Typography>
            <Typography
              padding={"4px 0px 5px"}
              fontWeight={600}
              fontSize={"18px"}
            >
              {sectionLabel}
            </Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <IconButton
              onClick={handleCreateTaskOpen}
              sx={{
                background: "black",
                color: "white",
                padding: "0px",
                width: "20px",
                height: "20px",
                "&:hover": {
                  background: "rgba(0,0,0,0.5)",
                },
              }}
            >
              <AddIcon sx={{ height: "20px" }} />
            </IconButton>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: "black",
                padding: "0px",
                width: "20px",
                height: "20px",
              }}
            >
              <MoreHorizIcon sx={{ height: "20px" }} />
            </IconButton>
          </Box>
        </Box>
        {/* Menu Component */}
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
              borderRadius: 2,
              background: "#FFFFFFE6",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              console.log("Edit clicked for section:", id);
              setIsEditingLabel(true);
              handleMenuClose();
            }}
          >
            <Box
              display={"flex"}
              gap={2}
              alignItems={"center"}
              minWidth={"140px"}
            >
              <img src="/rename.svg" alt="rename" width={20} height={20} />
              <Typography fontSize={14}>Rename</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("Clear clicked for section:", id);
              handleMenuClose();
            }}
          >
            <Box
              display={"flex"}
              gap={2}
              alignItems={"center"}
              minWidth={"140px"}
            >
              <img src="/clear.svg" alt="clear" width={20} height={20} />
              <Typography fontSize={14}>Clear</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("Delete clicked for section:", id);
              handleMenuClose();
            }}
          >
            <Box
              display={"flex"}
              gap={2}
              alignItems={"center"}
              minWidth={"140px"}
            >
              <img src="/delete.svg" alt="delete" width={20} height={20} />
              <Typography color="#FF5630" fontSize={14}>
                Delete
              </Typography>
            </Box>
          </MenuItem>
        </Menu>

        {createTaskOpen ? (
          <Box className="createTaskBox" mb={2}>
            <MyTextField
              ref={inputRef}
              id="newTaskName"
              placeholder="Untitled"
              label=""
              fontWeight={700}
              borderColor="transparent"
              background={"white"}
              value={newTaskName}
              onChange={handleTaskInputfieldChange}
              onKeyDown={handleTaskInputKeyDown}
              onBlur={() => setCreateTaskOpen(false)}
            />
            <Typography
              sx={{
                color: "rgb(122,125,161)",
                fontSize: "12px",
                mt: 1,
                ml: 1,
              }}
            >
              Press Enter to create task.
            </Typography>
          </Box>
        ) : null}
        <SortableContext
          id={id}
          items={[...filteredTasks?.map((t) => t?.id), bottomPlaceholderId]}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {enhancedTasks
              .filter((task) => task && task?.id)
              .map((task) => {
                if (!task) return null;

                const isGhost = task.isGhost;

                return (
                  <React.Fragment key={task?.id}>
                    <Box sx={{ mb: 2, opacity: isGhost ? 0.5 : 1 }}>
                      {isGhost ? (
                        <TaskItem task={task} isGhost />
                      ) : (
                        <SortableTaskItem id={task?.id}>
                          <TaskItem task={task} />
                        </SortableTaskItem>
                      )}
                    </Box>
                  </React.Fragment>
                );
              })}
            <div
              ref={setBottomPlaceholderRef}
              style={{
                height: "10px",
                marginTop: "1px",
              }}
            ></div>
          </div>
        </SortableContext>
      </Box>
    </>
  );
};

export default BoardSection;
