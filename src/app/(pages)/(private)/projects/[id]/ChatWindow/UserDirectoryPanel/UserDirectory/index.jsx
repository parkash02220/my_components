import { Box, Typography } from "@mui/material";
import UserDIrectoryItem from "./UserDIrectoryItem";
import React from "react";
import Loader from "@/components/Loader/Loader";

const UserDirectory = ({
  isExpanded,
  handleChatStart,
  combinedList,
  loadMoreRef,
  hasMore,
  loading,
  loadingMore,
  debouncedSearchValue,
}) => {
  return (
    <Box
      minWidth={0}
      minHeight={0}
      flex="1 1 auto"
      display="flex"
      flexDirection="column"
      pb={1}
      position="relative"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Box
        height="100%"
        width="100%"
        minHeight={0}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        position={'relative'}
      >
        <Box pb={1} display="flex" flexDirection="column">
          {loading && combinedList?.length === 0 && (
            <Box position={'absolute'} width={'100%'} height={'100%'}>
              <Loader />
            </Box>
          )}
          {!loading &&
            combinedList?.length > 0 &&
            combinedList.map(({ type, data }) => (
              <UserDIrectoryItem
                key={data?.id}
                isExpanded={isExpanded}
                chatroom={type === "chatroom" ? data : undefined}
                user={type === "user" ? data : undefined}
                handleChatStart={handleChatStart}
              />
            ))}
          {hasMore && (
            <Box ref={loadMoreRef} sx={{ height: "1px" }} />
          )}
          {loadingMore && (
            <Box>
              <Loader width={40} height={40}/>
            </Box>
          )}
          {!loading && combinedList?.length === 0 && (
            <Box
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
                color={"#1C252E"}
                fontWeight={600}
              >
                Not found
              </Typography>
              <Box display="flex" gap={1}>
                <Typography fontSize="14px" color={"#1C252E"}>
                  No results found for
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color={"#1C252E"}>
                  {`"${debouncedSearchValue}".`}
                </Typography>
              </Box>
              <Typography fontSize="14px" color={"#1C252E"}>
                Try checking for typos or using complete words.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDirectory;
