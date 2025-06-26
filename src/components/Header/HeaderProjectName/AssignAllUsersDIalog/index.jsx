import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import MySearch from "@/components/MySearch/MySearch";
import useToast from "@/hooks/common/useToast";
import useToggleAssignTask from "@/hooks/projects/task/useToggleAssignTask";
import useToggleAssignProject from "@/hooks/projects/useToggleAssignProject";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Content from "./Content";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";
const AssignAllUsersDialog = ({
  open,
  handleClose,
  assignedUsers = [],
  projectId,
}) => {
  const toastId = "assing_all_user";
  const { showToast } = useToast();
  const { isDownXs } = useResponsiveBreakpoints();
  const fontSize = useResponsiveValue("fontSize");
  const iconSize = useResponsiveValue("iconSize");
  const { loadingAssignProjectIds, errorAssignProject, toggleAssignProject } =
    useToggleAssignProject();
  const theme = useTheme();
  const {
    setPage,
    loadMoreRef,
    allUsers,
    loadingAllUsers,
    loadingMoreAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
    page,
    hasFetchedOnce,
    resetStates,
    hasMore,
  } = useGetAllUsers("all");

  const handleAssignToggle = async (userId, isAssigned) => {
    let result;
    if (isAssigned) {
      if (assignedUsers?.length === 2) {
        showToast({
          toastId,
          type: "error",
          message: "You can't remove all the users from the project.",
        });
        return;
      }
      result = await toggleAssignProject(projectId, userId, "remove_user");
    } else {
      result = await toggleAssignProject(projectId, userId, "add_user");
    }
  };

  const handleSearchClear = () => {
    resetStates();
  };

  const handleAssignDialogClose = () => {
    resetStates();
    handleClose();
  };

  return (
    <>
      <Box
        className="assignDialog__container"
        boxShadow={
          "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
        }
      >
        <MyDialog
          open={open}
          minwidth={"444px"}
          maxwidth={"444px"}
          width={"100%"}
          titlepadding="24px 24px 0px"
          contentpadding="0px !important"
          handleClose={handleAssignDialogClose}
          title={
            <Box
              className="assignDialog__title"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <Typography variant="title" fontWeight={600}>
                Contacts
              </Typography>
              <Typography variant="title2">{`(${totalUsers || 0})`}</Typography>
            </Box>
          }
          content={
            <Box className="assignDialog__contentBox">
              <Box
                className="assignDialog__searchBox"
                padding={
                  isDownXs ? "12px 24px 16px 20px" : "24px 24px 20px 20px"
                }
              >
                <MySearch
                  fullWidth
                  borderRadius="8px"
                  hoverBorderColor={theme.palette.primary.main}
                  focusedBorder={`2px solid ${theme.palette.primary.main}`}
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  onClear={handleSearchClear}
                  placeholder="Search contact..."
                  inputFontSize={fontSize}
                  iconStyle={{ width: iconSize, height: iconSize }}
                />
              </Box>

              <Content
                hasFetchedOnce={hasFetchedOnce}
                loadingAllUsers={loadingAllUsers}
                loadingMoreAllUsers={loadingMoreAllUsers}
                errorAllUsers={errorAllUsers}
                allUsers={allUsers}
                loadMoreRef={loadMoreRef}
                handleAssignToggle={handleAssignToggle}
                assignedUsers={assignedUsers}
                hasMore={hasMore}
                loadingAssignProjectIds={loadingAssignProjectIds}
                debouncedSearchValue={debouncedSearchValue}
              />
            </Box>
          }
        />
      </Box>
    </>
  );
};
export default AssignAllUsersDialog;
