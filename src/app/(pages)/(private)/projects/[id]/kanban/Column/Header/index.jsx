import MyTextField from "@/components/MyTextfield/MyTextfield";
import useUpdateSectionName from "@/hooks/projects/section/useUpdateSectionName";
import useCreateTask from "@/hooks/projects/task/useCreateTask";
import {
  Box,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ColumnHeaderMenu from "./ColumnHeaderMenu";

export default function ColumnHeader({ tasks, column, attributes, listeners }) {
  const editSectionNameRef = useRef(null);
  const [showEditTextfield, setShowEditTextfield] = useState(false);
  const {
    columnName,
    loadingUpdateColumnName,
    handleColumnNameInputfieldChange,
    handleColumnInputKeyDown,
    startEditing,
    cancelEditing,
  } = useUpdateSectionName(column?.title, setShowEditTextfield);


  const inputRef = useRef(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const {
    newTaskName,
    loadingCreateTask,
    handleTaskInputfieldChange,
    handleTaskInputKeyDown,
    setNewTaskName,
  } = useCreateTask(column?.id, setCreateTaskOpen);

  const handleCreateTaskOpen = () => {
    setCreateTaskOpen((pre) => !pre);
  };
  useEffect(() => {
    if (createTaskOpen && inputRef.current) {
      inputRef.current.querySelector("input")?.focus();
    }
  }, [createTaskOpen]);

  useEffect(() => {
    if (showEditTextfield && editSectionNameRef.current) {
      editSectionNameRef.current.querySelector("input")?.focus();
    }
  }, [showEditTextfield]);

  const handleCreateTaskTextFieldBlur = () => {
    setTimeout(() => {
      setCreateTaskOpen(false);
    }, 100);
    setNewTaskName("");
  };

  const handleBlurUpdateSectionName = () => {
    cancelEditing();
    setShowEditTextfield(false);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // borderBottom="2px solid #ddd"
        height={"50px"}
      >
        <Box display={"flex"} alignItems={"center"} gap={1} flex={1}>
          <Typography
            sx={{
              height: "24px",
              minWidth: "24px",
              background: "rgba(145,158,171,0.16)",
              whiteSpace: "nowrap",
              color: "#637381",
              borderRadius: "50%",
              fontWeight: 700,
              fontSize: "12px",
              borderColor: "rgba(145,158,171,0.24)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 6px",
              borderRadius: "50%",
            }}
          >
            {tasks?.length || 0}
          </Typography>
          {showEditTextfield ? (
            <Fade in={showEditTextfield} timeout={600}>
              <Box>
                <MyTextField
                  ref={editSectionNameRef}
                  placeholder="Untitled"
                  label=""
                  fontWeight={600}
                  borderColor="black"
                  background={"#F4F6F8"}
                  value={columnName}
                  onChange={handleColumnNameInputfieldChange}
                  onKeyDown={(e) => handleColumnInputKeyDown(e, column?.id)}
                  onBlur={handleBlurUpdateSectionName}
                  fullWidth={true}
                  minWidth="0px"
                  loading={loadingUpdateColumnName}
                  inputFontSize="16px"
                />
              </Box>
            </Fade>
          ) : (
            <Typography
              variant="subtitle1"
              onClick={() => setShowEditTextfield(true)}
              sx={{
                fontWeight: 600,
                color: "rgb(35, 37, 46)",
                width: "100%",
                cursor: "text",
              }}
            >
              {columnName}
            </Typography>
          )}
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Box
            sx={{
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleCreateTaskOpen}
              sx={{
                color: "white",
                padding: "0px",
                width: "20px",
                height: "20px",
              }}
            >
              <img
                src="/addTaskIcon.svg"
                alt="add task icon"
                width={"100%"}
                height={"100%"}
              />
            </IconButton>
          </Box>
          <ColumnHeaderMenu
            columnName={columnName}
            startEditing={startEditing}
            column={column}
            setShowEditTextfield={setShowEditTextfield}
          />
          <Box
            sx={{
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
              borderRadius: "50%",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              {...attributes}
              {...listeners}
              size="small"
              style={{
                cursor: "grab",
                color: "#999",
                width: "20px",
                height: "20px",
                padding: "0px",
              }}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <span className="sr-only">{`Move column: ${column.title}`}</span>
              <img
                src="/columnDragIcon.svg"
                alt="drag column icon"
                width={"100%"}
                height={"100%"}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {createTaskOpen ? (
        <Box className="createTaskBox" mb={2}>
          <MyTextField
            fullWidth={true}
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
            onBlur={handleCreateTaskTextFieldBlur}
            loading={loadingCreateTask}
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
    </>
  );
}
