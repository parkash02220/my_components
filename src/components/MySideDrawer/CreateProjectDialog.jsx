import { useEffect, useMemo, useRef, useState } from "react";
import MyButton from "../MyButton/MyButton";
import { Box, Typography } from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import MyDialog from "../MyDialog/MyDialog";
import useProjectNameAvailability from "@/hooks/projects/useProjectNameAvailability";
import useToast from "@/hooks/common/useToast";
import MyAutoCompleteVarient from "../MyAutoComplete/MyAutoCompleteVarient";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
const CreateProjectDialog = ({
  open,
  onClose,
  onCreate,
  loadingCreateProject,
}) => {
  const { isDownXs, isXs } = useResponsiveBreakpoints();
  const { fontSize } = useResponsiveValue();
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, loading, available] = useProjectNameAvailability(projectName);
  const { showToast } = useToast();
  const handleDialogClose = () => {
    setProjectName("");
    setError(false);
    setHelperText("");
    setSelectedUsers([]);
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
    if (selectedUsers?.length === 0) {
      showToast({ type: "error", message: "Please select atleast one user." });
      return;
    }
    const trimmedName = projectName.trim();
    await onCreate(trimmedName, selectedUsers);
    handleDialogClose();
  };

  return (
    <MyDialog
      open={open}
      handleClose={handleDialogClose}
      title="Create New Project"
      fontSize={isDownXs ? "18px" : "24px"}
      width={isDownXs ? "100%" : "auto"}
      content={
        <Box pt={2} paddingInline={1}>
          <Box display={"flex"} flexDirection={"column"}>
            <MyTextField
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={handleProjectInputfieldChange}
              variant="outlined"
              autoFocus
              error={error}
              helperText={helperText}
              inputFontSize={fontSize}
              labelFontSize={fontSize}
            />
            {!error && (
              <Typography
                fontSize={isXs ? 10 : 12}
                fontWeight={700}
                color={available ? "green" : "red"}
                mt={0}
                ml={1}
              >
                {message}
              </Typography>
            )}
          </Box>
          <Box mt={2}>
            <MyAutoCompleteVarient
              type={"all_users"}
              selectedOptions={selectedUsers}
              setSelectedOptions={setSelectedUsers}
              label="Select users"
            />
          </Box>
        </Box>
      }
      actions={
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={isDownXs ? "column-reverse" : "row"}
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
            fullWidth={true}
            size="medium"
            padding={"8px 12px"}
            fontSize={fontSize}
          >
            Cancel
          </MyButton>
          <MyButton
            fullWidth={true}
            onClick={handleCreateProject}
            disabled={error || !available || loadingCreateProject}
            variant="contained"
            loading={loading}
            loadingText={"checking..."}
            size="medium"
            padding={"8px 12px"}
            fontSize={fontSize}
          >
            Create
          </MyButton>
        </Box>
      }
    />
  );
};

export default CreateProjectDialog;
