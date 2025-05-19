import { useEffect, useMemo, useRef, useState } from "react";
import MyButton from "../MyButton/MyButton";
import { Box, Chip, CircularProgress, List, Typography } from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import MyDialog from "../MyDialog/MyDialog";
import { ApiCall } from "@/utils/ApiCall";
import useProjectNameAvailability from "@/hooks/projects/useProjectNameAvailability";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import MySelect from "../MySelect/MySelect";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { getFullName } from "@/utils";
import MyAutoComplete from "../MyAutoComplete/MyAutoComplete";
import useToast from "@/hooks/common/useToast";
const CreateProjectDialog = ({
  open,
  onClose,
  onCreate,
  loadingCreateProject,
}) => {
  const { isXs } = useBreakpointFlags();
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, loading, available] = useProjectNameAvailability(projectName);
  const {showToast} = useToast();
  const {
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
    getAllUsersFromBackend,
    setSearchValue,
    setPage,
    loadMoreRef,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
    hasMore,
    page,
  } = useGetAllUsers();
  const handleDialogClose = () => {
    setProjectName("");
    setError(false);
    setHelperText("");
    onClose();
  };

  const filteredUsers = useMemo(() => {
    return allUsers?.filter(
      (user) =>
        !selectedUsers?.some((selectedUser) => selectedUser?.id === user?.id)
    );
  }, [allUsers, selectedUsers]);

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
    if(selectedUsers?.length===0){
      showToast({type:"error",message:"Please select atleast one user."})
      return;
    }
    const trimmedName = projectName.trim();
    await onCreate(trimmedName, selectedUsers);
    handleDialogClose();
  };
  const handleUserSelect = (_, newValue) => {
    setSelectedUsers(newValue);
  };

  const handleSearchUser = (event, inputValue) => {
    handleSearchValueChange(event);
  };


  useEffect(() => {
    if (!open) {
      setSelectedUsers([]);
    }
    if (!open && allUsers?.length > 0) {
      setSearchValue("");
      setAllUsers([]);
      setPage(1);
    }
  }, [open]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (open && allUsers?.length === 0) {
      getAllUsersFromBackend(signal);
    }
    return () => controller.abort();
  }, [open]);

  const handleAutoCompleteClose = () => {
    setSearchValue("");
  };

  return (
    <MyDialog
      open={open}
      handleClose={handleDialogClose}
      title="Create New Project"
      width={isXs ? "100%" : "auto"}
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
              inputFontSize="14px"
              labelFontSize="14px"
            />
            <Typography
              fontSize={12}
              fontWeight={700}
              color={available ? "green" : "red"}
              mt={0}
              ml={1}
            >
              {message}
            </Typography>
          </Box>
          <Box mt={2}>
            <MyAutoComplete
              fullWidth={true}
              multiple={true}
              value={selectedUsers}
              loading={loadingAllUsers && page <= 1}
              options={filteredUsers}
              filterOptions={(options) => options}
              getOptionLabel={(option) =>
                getFullName(option?.firstName, option?.lastName)
              }
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li
                  key={key}
                  {...rest}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={option.avatar || "/dummyUser.svg"}
                      alt={option.firstName}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        borderRadius: "50%",
                      }}
                    />
                    <Typography>
                      {getFullName(option.firstName, option.lastName)}
                    </Typography>
                  </li>
                );
              }}
              renderTags={(value, getTagProps) => {
                const visibleTags = value.slice(0, 2);
                return [
                  ...visibleTags.map((option, index) => (
                    <Chip
                      key={option?.id}
                      label={getFullName(option?.firstName, option?.lastName)}
                      {...getTagProps({ index })}
                    />
                  )),
                  value.length > 4 && (
                    <Typography key="more" fontSize={14}>
                      +{value.length - 4} more
                    </Typography>
                  ),
                ];
              }}
              onChange={(_, newValue) => {
                handleUserSelect(_, newValue);
              }}
              onInputChange={(event, inputValue) =>
                handleSearchUser(event, inputValue)
              }
              loadMoreRef={loadMoreRef}
              hasMore={hasMore}
              loadingMore={loadingAllUsers && page > 1}
              label={"Select users"}
              fontSize={14}
              labelFontSize={14}
              onClose={handleAutoCompleteClose}
            />
          </Box>
        </Box>
      }
      actions={
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={isXs ? "column-reverse" : "row"}
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
          >
            Create
          </MyButton>
        </Box>
      }
    />
  );
};

export default CreateProjectDialog;
