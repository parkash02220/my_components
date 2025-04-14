import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";
import { IconButton } from "@mui/material";
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
  const activeTask = tasks.find((t) => t?._id === activeTaskId);

  // Filter out active task (so it doesn't leave a gap)
  let filteredTasks = tasks;
  if (isDragging) {
    filteredTasks = tasks.filter((task) => task?._id !== activeTaskId);
  }

  let ghostIndex = -1;
  console.log("::over task id ", overTaskId);
  if (overTaskId === `bottom-${id}`) {
    ghostIndex = filteredTasks.length;
  } else {
    ghostIndex = filteredTasks.findIndex((task) => task?._id === overTaskId);
  }
  const enhancedTasks = [...filteredTasks];
  console.log(
    "::isdragging",
    isDragging,
    "ghostindex",
    ghostIndex,
    "activetask",
    activeTask
  );
  if (isDragging && ghostIndex !== -1 && activeTask) {
    console.log("::consle insdie dragging");
    enhancedTasks.splice(ghostIndex, 0, {
      ...activeTask,
      _id: `ghost-${activeTask?._id}${Date.now()}`,
      isGhost: true,
    });
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
          <Box>
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
          </Box>
        </Box>
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
          items={[...filteredTasks?.map((t) => t?._id), bottomPlaceholderId]}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {enhancedTasks
              .filter((task) => task && task?._id)
              .map((task) => {
                if (!task) return null;

                const isGhost = task.isGhost;

                return (
                  <React.Fragment key={task?._id}>
                    <Box sx={{ mb: 2, opacity: isGhost ? 0.5 : 1 }}>
                      {isGhost ? (
                        <TaskItem task={task} isGhost />
                      ) : (
                        <SortableTaskItem id={task?._id}>
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
