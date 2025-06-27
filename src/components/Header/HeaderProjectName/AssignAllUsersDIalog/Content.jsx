import React from "react";
import UserRow from "./UserRow";
import { Box, Typography, useTheme } from "@mui/material";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";

const Content = ({
  hasFetchedOnce,
  loadingAllUsers,
  loadingMoreAllUsers,
  errorAllUsers,
  allUsers,
  loadMoreRef,
  handleAssignToggle,
  assignedUsers,
  hasMore,
  loadingAssignProjectIds,
  debouncedSearchValue,
}) => {
  const theme = useTheme();
  const { isDownXs } = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
  const hasError = !!errorAllUsers;
  if (hasError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <Typography variant="title2" color="error">
          Something went wrong. Please try again.
        </Typography>
      </Box>
    );
  }

  if (loadingAllUsers || !hasFetchedOnce) {
    return (
      <Box
        className="assignDialog__loadingBox"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <img src="/iosLoader.gif" width="40px" height="40px" alt="Loading..." />
      </Box>
    );
  }

  if (hasFetchedOnce && !loadingAllUsers && allUsers?.length === 0) {
    return (
      <>
        <Box
          className="assignDialog__emptyBox"
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          mt={3}
          mb={10}
          alignItems={"center"}
        >
          <Typography variant="title" fontWeight={600}>
            Not found
          </Typography>
          <Box display={"flex"} gap={1}>
            <Typography variant="primary">No results found for</Typography>
            <Typography variant="primary" fontWeight={700}>
              {`"${debouncedSearchValue}".`}
            </Typography>
          </Box>
          <Typography variant="primary">
            Try checking for typos or using complete words.
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <>
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
          const isAssigned = assignedUsers.includes(user?.id);
          return (
            <React.Fragment key={user?.id}>
              <UserRow
                user={user}
                isAssigned={isAssigned}
                handleAssignToggle={handleAssignToggle}
                loadingAssignProjectIds={loadingAssignProjectIds}
                theme={theme}
              />
            </React.Fragment>
          );
        })}

        {hasMore &&
          (loadingMoreAllUsers ? (
            <Box display="flex" justifyContent="center" py={2}>
              <img
                src="/iosLoader.gif"
                style={{ width: "32px", minHeight: "32px" }}
                alt="Loading..."
              />
            </Box>
          ) : (
            <Box ref={loadMoreRef} sx={{ minHeight: "1px" }} />
          ))}
      </Box>
    </>
  );
};
export default Content;
