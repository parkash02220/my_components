import { useEffect, useRef, useState } from "react";
import MyButton from "../MyButton/MyButton";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import MyTextField from "../MyTextfield/MyTextfield";
import MyDialog from "../MyDialog/MyDialog";
import { ApiCall } from "@/utils/ApiCall";
import useProjectNameAvailability from "@/hooks/projects/useProjectNameAvailability";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import MySelect from "../MySelect/MySelect";
import useGetAllUsers from "@/hooks/projects/user/useGetAllUsers";
import { getFullName } from "@/utils";
import Avatar from "@mui/material/Avatar";
import MyAutoComplete from "../MyAutoComplete/MyAutoComplete";
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
  const {
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
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
  const handleUserSelect = (_, newValue) => {
    setSelectedUsers(newValue);
  };
  console.log("::all users", allUsers);

  const handleSearchUser = (event, inputValue) => {
      handleSearchValueChange(event);
  };

  console.log("::loading all user",loadingAllUsers)

  useEffect(() => {
    if (allUsers && !allUsers.some((u) => u.isLoadMore)) {
      setAllUsers([...allUsers, { isLoadMore: true }]);
    }
  }, [allUsers]);

  useEffect(() => {
    if (!open) {
      setSearchValue("");
      setSelectedUsers([]);
      setAllUsers([]);
      setPage(1);
    }
  }, [open]);
  return (
    <MyDialog
      open={open}
      handleClose={handleDialogClose}
      title="Create New Project"
      width={isXs ? "100%" : "auto"}
      content={
        <Box pt={2} paddingInline={1}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
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
              mt={1}
              ml={1}
            >
              {message}
            </Typography>
          </Box>
          <Box>
            <MyAutoComplete
              fullWidth={true}
              multiple={true}
              value={selectedUsers}
              options={allUsers}
              loading={page===1 && loadingAllUsers}
              loadingText={<Box display={'flex'} justifyContent={'center'} alignItems={'center'} justifyItems={'center'} minHeight={100}>
                <img src="/iosLoader.gif" alt="loader" style={{width:"30px",height:"30px"}} />
              </Box>}
              getOptionLabel={(option) =>
                getFullName(option?.firstName, option?.lastName)
              }
              renderOption={(props, option) => {
                if (option.isLoadMore) {
                  return loadingAllUsers ? (
                    <li {...props} style={{ justifyContent: "center" }}>
                      <img
                        src="/iosLoader.gif"
                        alt="loader"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </li>
                  ) : hasMore ? (
                    <li
                      {...props}
                      ref={loadMoreRef}
                      style={{ justifyContent: "center", height: "1px" }}
                    ></li>
                  ) : null;
                }

                return (
                  <li
                    {...props}
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
                  value.length > 2 && (
                    <Typography key="more">+{value.length - 2} more</Typography>
                  ),
                ];
              }}
              onChange={(_, newValue) => {
                const cleanedValue = newValue.filter((opt) => !opt.isLoadMore);
                handleUserSelect(_, cleanedValue);
              }}
              onInputChange={(event,inputValue) => handleSearchUser(event,inputValue)}
              loadMoreRef={loadMoreRef}
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
          >
            Create
          </MyButton>
        </Box>
      }
    />
  );
};

export default CreateProjectDialog;
