import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { useTaskContext } from "@/context/Task/TaskContext";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useCreateSubTask from "@/hooks/projects/task/subtask/useCreateSubTask";
import { Box } from "@mui/material";
import { useState } from "react";

const AddSubTaskDialog = ({ open, onClose }) => {
  const { state } = useTaskContext();
  const { activeTask } = state;
  const { isXs } = useBreakpointFlags();
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
    await addSubTaskToBackend(activeTask?.id, trimmedName);
    handleDialogClose();
  };
  return (
    <>
      <MyDialog
        open={open}
        handleClose={handleDialogClose}
        title="Add New Subtask"
        width={isXs ? "100%" : "auto"}
        content={
          <Box pt={2}>
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
            flexDirection={isXs ? "column-reverse" : "row"}
            justifyContent="space-between"
            gap={2}
            width="100%"
            p={isXs ? 1 : 2}
          >
            <MyButton
              onClick={handleDialogClose}
              color="black"
              variant="outlined"
              hoverBgColor="whitesmoke"
              padding={"8px 16px"}
              fullWidth={true}
            >
              Cancel
            </MyButton>
            <MyButton
              onClick={handleAddSubTask}
              disabled={error}
              variant="contained"
              loading={loadingCreateSubTask}
              loadingText={"Adding..."}
              padding={"8px 16px"}
              fullWidth={true}
            >
              Add
            </MyButton>
          </Box>
        }
      />
    </>
  );
};
export default AddSubTaskDialog;
