import { useEffect, useRef, useState } from "react";
import MyButton from "../MyButton/MyButton";
import { Box, Typography } from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import MyDialog from "../MyDialog/MyDialog";
import { ApiCall } from "@/utils/ApiCall";
import useProjectNameAvailability from "@/hooks/projects/useProjectNameAvailability";

const CreateProjectDialog = ({ open, onClose, onCreate,loadingCreateProject }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [message, loading, available] = useProjectNameAvailability(projectName);

  const handleDialogClose = () => {
    setProjectName("");
    setError(false);
    setHelperText("");
    onClose();
  };

  const handleProjectInputfieldChange = (e) => {
    const newName = e.target.value;
    let error = false;
    let helperText = "";

    if (!newName.trim()) {
      error = true;
      helperText = "Project name cannot be empty";
    } else if (newName.length < 3 || newName.length > 50) {
      error = true;
      helperText = "Board name must be between 3 and 50 characters";
    }
    setProjectName(newName);
    setError(error);
    setHelperText(helperText);
  };

  const handleCreateProject = async () => {
    const trimmedName = projectName.trim();
    await onCreate(trimmedName);
    handleDialogClose();
  };

  return (
    <MyDialog
      open={open}
      handleClose={handleDialogClose}
      title="Create New Project"
      content={
        <Box pt={2} paddingInline={1}>
          <MyTextField
            fullWidth
            label="Project Name"
            value={projectName}
            onChange={handleProjectInputfieldChange}
            variant="outlined"
            autoFocus
            error={error}
            helperText={helperText}
          />
          <Typography
            fontSize={12}
            fontWeight={700}
            color={available ? "green" : "red"}
            mt={1}
            ml={1}
          >
            {message}
          </Typography>
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
          <MyButton onClick={handleDialogClose} color="black" variant="outlined" hoverBgColor="whitesmoke">
            Cancel
          </MyButton>
          <MyButton
            onClick={handleCreateProject}
            disabled={error || !available || loadingCreateProject}
            variant="contained"
            loading={loading}
            loadingText={"checking..."}
          >
            Create
          </MyButton>
        </Box>
      }
    />
  );
};

export default CreateProjectDialog;
