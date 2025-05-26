import { Box, Typography, useTheme } from "@mui/material";
import UserRow from "./UserRow";

const Content = ({
  hasFetchedOnce,
  loadingAllUsers,
  allUsers,
  loadMoreRef,
  debouncedSearchValue,
  hasMore,
  handleAssignToggle,
  assignedUserIds,
  loadingAssignTaskIds,
}) => {
  const theme = useTheme();
  if (!hasFetchedOnce || (loadingAllUsers && allUsers.length === 0)) {
    return (
      <Box
        className="assignDialog__loadingBox"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <img src="/iosLoader.gif" width="40px" height="40px" />
      </Box>
    );
  }

  if (hasFetchedOnce && !loadingAllUsers && allUsers.length === 0) {
    return (
      <Box
        className="assignDialog__emptyBox"
        display="flex"
        flexDirection="column"
        gap={1}
        mt={3}
        mb={10}
        alignItems="center"
      >
        <Typography
          variant="h6"
          fontSize="18px"
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          Not found
        </Typography>
        <Box display="flex" gap={1}>
          <Typography fontSize="14px" color={theme.palette.primary.main}>
            No results found for
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            {`"${debouncedSearchValue}".`}
          </Typography>
        </Box>
        <Typography fontSize="14px" color={theme.palette.primary.main}>
          Try checking for typos or using complete words.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="assignDialog__contactListBox"
      padding="0px 20px 16px 20px"
      display="flex"
      flexDirection="column"
      gap={2}
      height={384}
      sx={{
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {allUsers.map((user) => {
        const isAssigned = assignedUserIds.includes(user?.id);
        return (
          <UserRow
            key={user?.id}
            user={user}
            isAssigned={isAssigned}
            onToggle={handleAssignToggle}
            loading={loadingAssignTaskIds?.includes(user?.id)}
          />
        );
      })}
      {hasMore &&
        (loadingAllUsers ? (
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
  );
};
export default Content;
