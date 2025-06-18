import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import MySearch from "@/components/MySearch/MySearch";
import useToggleAssignTask from "@/hooks/projects/task/useToggleAssignTask";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Content from "./Content";
const AssignDialog = ({
  open,
  handleClose,
  assignedUsers,
  taskId,
  isDrawerOpen,
}) => {
  const { loadingAssignTaskIds, errorAssignTask, toggleAssignTask } =
    useToggleAssignTask();
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
  } = useGetAllUsers("board");
  const [hasMounted, setHasMounted] = useState(true);
  const [assignedUserIds, setAssignedUserIds] = useState([]);
  useEffect(() => {
    if (open && assignedUsers) {
      setAssignedUserIds(assignedUsers?.map((user) => user?.id));
    }
  }, [open, assignedUsers]);

  const handleAssignToggle = async (userId, isAssigned) => {
    const previousAssignedUserIds = [...assignedUserIds];
    let updatedAssignedUsers;
    if (isAssigned) {
      updatedAssignedUsers = assignedUserIds.filter((id) => id !== userId);
    } else {
      updatedAssignedUsers = [...assignedUserIds, userId];
    }
    setAssignedUserIds(updatedAssignedUsers);

    const result = await toggleAssignTask(taskId, updatedAssignedUsers, userId);

    if (result?.error) {
      setAssignedUserIds(previousAssignedUserIds);
    }
  };

  const handleSearchClear = () => {
    resetStates();
  };

  const handleAssignDialogClose = () => {
    setSearchValue("");
    handleClose();
  };

  useEffect(() => {
    if (!open && !isDrawerOpen) {
     resetStates();
    }
  }, [open, isDrawerOpen]);

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
              <Typography
                variant="h2"
                fontSize={"18px"}
                fontWeight={600}
                color={theme.palette.primary.main}
              >
                Contacts
              </Typography>
              <Typography color={theme.palette.primary.main}>{`(${
                totalUsers || 0
              })`}</Typography>
            </Box>
          }
          content={
            <Box className="assignDialog__contentBox">
              <Box
                className="assignDialog__searchBox"
                padding="24px 24px 20px 20px"
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
                />
              </Box>
              <Content
                loadMoreRef={loadMoreRef}
                loadingAllUsers={loadingAllUsers}
                loadingMoreAllUsers={loadingMoreAllUsers}
                errorAllUsers={errorAllUsers}
                allUsers={allUsers}
                hasMore={hasMore}
                hasFetchedOnce={hasFetchedOnce}
                debouncedSearchValue={debouncedSearchValue}
                assignedUserIds={assignedUserIds}
                handleAssignToggle={handleAssignToggle}
                loadingAssignTaskIds={loadingAssignTaskIds}
              />
            </Box>
          }
        />
      </Box>
    </>
  );
};
export default AssignDialog;
