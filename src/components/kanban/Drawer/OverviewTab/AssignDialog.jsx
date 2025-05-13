import MyButton from "@/components/MyButton/MyButton";
import MyDialog from "@/components/MyDialog/MyDialog";
import MySearch from "@/components/MySearch/MySearch";
import useToggleAssignTask from "@/hooks/projects/task/useToggleAssignTask";
import useGetAllUsers from "@/hooks/projects/user/useGetAllUsers";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
const AssignDialog = ({ open, handleClose, assignedUsers, taskId,isDrawerOpen }) => {
  const { loadingAssignTaskIds, errorAssignTask, toggleAssignTask } =
    useToggleAssignTask();
  const theme = useTheme();
  const {
    setPage,
    loadMoreRef,
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
  } = useGetAllUsers('board');
  const [hasMounted, setHasMounted] = useState(true);
  const [assignedUserIds, setAssignedUserIds] = useState([]);
  useEffect(() => {
    if (open && assignedUsers) {
      setAssignedUserIds(assignedUsers.map((user) => user?.id));
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
    setSearchValue("");
    setPage(1);
  };

  const handleAssignDialogClose = () => {
    setSearchValue("");
    handleClose();
  };

  useEffect(() => {
    if (!open && !isDrawerOpen) {
      setSearchValue("");
      setAllUsers([]);
      setPage(1);
    }
  }, [open, isDrawerOpen]);

  useEffect(() => {
    if (open && allUsers.length === 0) {
      setPage(1);
    }
  }, [open]);
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
          width={'100%'}
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
                padding={"24px 24px 20px 20px"}
              >
                <MySearch
                  fullWidth
                  borderRadius="8px"
                  hoverBorderColor={theme.palette.primary.main}
                  focusedBorder={`2px solid ${theme.palette.primary.main}`}
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  onClear={handleSearchClear}
                />
              </Box>

              {allUsers?.length > 0 ? (
                <Box
                  className="assignDialog__contactListBox"
                  padding={"0px 20px 16px 20px"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  height={384}
                  sx={{
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {allUsers.map((user) => {
                    const isAssigned = assignedUserIds.includes(user?.id);
                    return (
                      <Box
                        key={user?.id}
                        className="assignDialog__contactBox"
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          className="cotactBox__avatarBox"
                          width={40}
                          height={40}
                        >
                          <AvatarBox src={user?.avatar} />
                        </Box>
                        <Box
                          className="cotactBox__dataBox"
                          flex={"1 1 auto"}
                          minWidth={0}
                          margin={0}
                        >
                          <Typography
                            color={theme.palette.primary.main}
                            fontWeight={600}
                            fontSize={"14px"}
                          >{`${user?.firstName || ""} ${
                            user?.lastName || ""
                          }`}</Typography>
                          <Typography color="#637381" fontSize={"14px"}>
                            {user?.email || ""}
                          </Typography>
                        </Box>
                        <Box className="cotactBox__actionBox">
                          <MyButton
                            backgroundColor="inherit"
                            loading={loadingAssignTaskIds?.includes(user?.id)}
                            onClick={() =>
                              handleAssignToggle(user?.id, isAssigned)
                            }
                            fontWeight={700}
                            sx={{ height: "30px" }}
                            borderRadius="8px"
                            padding={"4px"}
                            fontSize={"13px"}
                            minWidth="64px"
                            variant="text"
                            color={
                              isAssigned
                                ? "#00A76F"
                                : theme.palette.primary.main
                            }
                            hoverBgColor={
                              isAssigned
                                ? "rgba(0,167,111,0.08)"
                                : "rgba(145,158,171,0.08)"
                            }
                          >
                            <img
                              src={
                                isAssigned
                                  ? "/assingedIcon.svg"
                                  : "/assignPlusIcon.svg"
                              }
                              alt="assign"
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "4px",
                              }}
                            />
                            {isAssigned ? "Assigned" : "Assign"}
                          </MyButton>
                        </Box>
                      </Box>
                    );
                  })}

                  {loadingAllUsers && (
                    <Box display="flex" justifyContent="center" py={2}>
                      <img
                        src="/iosLoader.gif"
                        width={32}
                        height={32}
                        alt="Loading..."
                      />
                    </Box>
                  )}
                  <Box ref={loadMoreRef} style={{ height: 1 }} />
                </Box>
              ) : !loadingAllUsers? (
                <Box
                  className="assignDialog__emptyBox"
                  display={"flex"}
                  flexDirection={"column"}
                  gap={1}
                  mt={3}
                  mb={10}
                  alignItems={"center"}
                >
                  <Typography
                    variant="h6"
                    fontSize={"18px"}
                    color={theme.palette.primary.main}
                    fontWeight={600}
                  >
                    Not found
                  </Typography>
                  <Box display={"flex"} gap={1}>
                    <Typography
                      fontSize={"14px"}
                      color={theme.palette.primary.main}
                    >
                      No results found for
                    </Typography>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={700}
                      color={theme.palette.primary.main}
                    >
                      {`"${searchValue}".`}
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={"14px"}
                    color={theme.palette.primary.main}
                  >
                    Try checking for typos or using complete words.
                  </Typography>
                </Box>
              ) : (
                <Box
                  className="assignDialog__loadingBox"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minHeight={200}
                >
                  <img src="/iosLoader.gif" width={"40px"} height={"40px"} />
                </Box>
              )}
            </Box>
          }
        />
      </Box>
    </>
  );
};
export default AssignDialog;

const AvatarBox = ({ src, alt = "user" }) => (
  <Box
    width={40}
    height={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    overflow="hidden"
    fontSize="1.25rem"
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        color: "transparent",
      }}
    />
  </Box>
);
