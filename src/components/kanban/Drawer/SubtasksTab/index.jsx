const activeTask = {
  title: "Build New Feature",
  subtasks: [
    { id: 1, title: "Complete project proposal", completed: true },
    { id: 2, title: "Conduct market research", completed: true },
    { id: 3, title: "Design user interface mockups", completed: false },
    { id: 4, title: "Develop backend api", completed: false },
    { id: 5, title: "Implement authentication system", completed: false },
  ],
};

import {
  Box,
  Checkbox,
  Typography,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import useToggleSubTaskCompletion from "@/hooks/projects/task/subtask/useToggleSubTaskCompletion";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useAppContext } from "@/context/AppContext";
import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import useCreateSubTask from "@/hooks/projects/task/subtask/useCreateSubTask";
const SubTasksTab = () => {
  const { state } = useAppContext();
  const { activeTask } = state || {};
  const theme = useTheme();
  const [subTaskPopupOpen, setSubTaskPopupOpen] = useState(false);
  const { loadingIdsToggle, subtasks, toggleCompletionSubTask } =
    useToggleSubTaskCompletion(activeTask);

  const handleToggle = async (subTaskId, completed) => {
    toggleCompletionSubTask(activeTask?.id, subTaskId, completed);
  };

  const completedCount = subtasks?.filter((task) => task?.completed)?.length;
  const totalCount = subtasks?.length;
  const progress = (completedCount / totalCount) * 100;

  const handleDialogClose = () => {
    setSubTaskPopupOpen(false);
  };

  return (
    <>
      <AddSubTaskDialog
        open={subTaskPopupOpen}
        onClose={handleDialogClose}
        taskId={activeTask?.id}
      />
      <Box p={"24px 20px"}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box>
            <Typography
              mb={1}
              fontSize={14}
              color={theme?.palette?.primary?.main}
            >
              {`${completedCount} of ${totalCount}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 2,
                height: 4,
                borderRadius: 4,
                backgroundColor: "rgba(0,167,111,0.24)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "rgb(44,167,111)",
                },
              }}
            />
          </Box>

          <List sx={{ padding: "0px !important" }}>
            {subtasks.map((subtask) => (
              <ListItem key={subtask.id} disablePadding sx={{ mt: 1 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Checkbox
                    edge="start"
                    checked={subtask.completed}
                    disabled={loadingIdsToggle.includes(subtask.id)}
                    onChange={() => handleToggle(subtask.id, subtask.completed)}
                    icon={
                      <CheckBoxOutlineBlankIcon
                        sx={{ fontSize: 20, borderRadius: 2 }}
                      />
                    }
                    checkedIcon={
                      <CheckBoxIcon
                        sx={{
                          fontSize: 20,
                          borderRadius: 2,
                          color: "rgb(44,167,111)",
                        }}
                      />
                    }
                    sx={{
                      p: 0.5,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      onClick={() =>
                        handleToggle(subtask.id, subtask.completed)
                      }
                      sx={{
                        fontSize: 14,
                        color: theme?.palette?.primary?.main,
                        cursor: "pointer",
                        width: "fit-content",
                        maxWidth: "100%",
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Button
            onClick={() => setSubTaskPopupOpen(true)}
            startIcon={<AddIcon sx={{ fontSize: "24px" }} />}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: 14,
              minWidth: 64,
              padding: "5px 12px",
              border: "1px solid rgba(145,158,171,0.32)",
              width: "fit-content",
              color: theme?.palette?.primary?.main,
              mt: 1,
            }}
          >
            Subtask
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SubTasksTab;

const AddSubTaskDialog = ({ open, onClose, taskId }) => {
  const { loadingCreateSubTask, addSubTaskToBackend } = useCreateSubTask();
  const [subtaskName, setSubtaskName] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleDialogClose = () => {
    setSubtaskName("");
    setError(false);
    setHelperText("");
    onClose();
  };

  const handleSubTaskInputfieldChange = (e) => {
    const newName = e.target.value;
    let error = false;
    let helperText = "";

    if (!newName.trim()) {
      error = true;
      helperText = "Subtask name cannot be empty";
    } else if (newName.length < 3 || newName.length > 50) {
      error = true;
      helperText = "Subtask name must be between 3 and 50 characters";
    }
    setSubtaskName(newName);
    setError(error);
    setHelperText(helperText);
  };

  const handleKeyDownInAddSubTask = (e) => {
    if (e.key === "Enter") {
      handleAddSubTask();
    }
  };

  const handleAddSubTask = async () => {
    const trimmedName = subtaskName.trim();
    await addSubTaskToBackend(taskId, trimmedName);
    handleDialogClose();
  };
  return (
    <>
      <MyDialog
        open={open}
        handleClose={handleDialogClose}
        title="Add New Subtask"
        content={
          <Box pt={2} paddingInline={1}>
            <MyTextField
              fullWidth
              label="Subtask Name"
              value={subtaskName}
              onChange={handleSubTaskInputfieldChange}
              variant="outlined"
              autoFocus
              error={error}
              helperText={helperText}
              onKeyDown={handleKeyDownInAddSubTask}
            />
          </Box>
        }
        actions={
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            width="100%"
            p={2}
            pt={0}
          >
            <MyButton
              onClick={handleDialogClose}
              color="black"
              variant="outlined"
              hoverBgColor="whitesmoke"
            >
              Cancel
            </MyButton>
            <MyButton
              onClick={handleAddSubTask}
              disabled={error}
              variant="contained"
              loading={loadingCreateSubTask}
              loadingText={"Adding..."}
            >
              Add
            </MyButton>
          </Box>
        }
      />
    </>
  );
};
