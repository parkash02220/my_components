import { Box, IconButton } from "@mui/material";
import Header from "./Header";
import SearchBox from "./SearchBox";
import UserDirectory from "./UserDirectory";
import { useEffect, useMemo, useState } from "react";
import { useChatContext } from "@/context/Chat/ChatContext";
import useGetChatroomsAndUsers from "@/hooks/chat/useGetChatroomsAndUsers";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import MobileSideDrawer from "@/components/MySideDrawer/MobileSideDrawer";

const UserDirectoryPanel = ({
  handleChatStart,
  setSelectedDirectoryItem,
  clearInput,
}) => {
  const { isXs } = useResponsiveBreakpoints();
  const {
    loading,
    loadingMore,
    error,
    getChatroomsAndUsers,
    loadMoreRef,
    hasMore,
    page,
    searchValue,
    debouncedSearchValue,
    handleSearchClear,
    handleSearchValueChange,
  } = useGetChatroomsAndUsers();
  const { chatWindow } = useChatContext().state;
  const { usersWithoutChatRoom, chatRooms } = chatWindow;
  const [isExpanded, setIsExpanded] = useState(!isXs);
  const toggleExpand = () => {
    setIsExpanded((pre) => !pre);
  };
  const combinedList = useMemo(() => {
    const chatroomItems =
      chatRooms?.allIds?.map((id) => ({
        type: "chatroom",
        data: chatRooms.byIds[id],
      })) || [];

    const userItems =
      usersWithoutChatRoom?.allIds
        ?.filter(
          (id) =>
            !chatRooms.allIds.some((roomId) => {
              const room = chatRooms.byIds[roomId];
              return room?.targetUser?.id === id;
            })
        )
        .map((id) => ({
          type: "user",
          data: usersWithoutChatRoom.byIds[id],
        })) || [];

    return [...chatroomItems, ...userItems];
  }, [chatRooms, usersWithoutChatRoom]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // flex:1,
          minHeight: 0,
          width: isExpanded ? 320 : isXs ? 0 : 96,
          transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {isXs && (
          <IconButton
            onClick={()=> setIsExpanded(true)}
            sx={{
              background: "#00A76F",
              top: "84px",
              left: "0px",
              zIndex: 9,
              width: 32,
              height: 32,
              position: "absolute",
              boxShadow: "0 8px 16px 0 rgba(0 167 111 / 0.24)",
              color: "#FFFFFF",
              padding: "0px",
              borderRadius: "0px 12px 12px 0px",
              "&:hover": {
                background: "#004B50",
              },
            }}
          >
            <img
              src="/showUsersIcon.svg"
              alt="users"
              style={{ width: "16px", height: "16px", flexShrink: 0 }}
            />
          </IconButton>
        )}
        {!isXs && (
          <Box
            minHeight={0}
            display={"flex"}
            flexDirection={"column"}
            flex={"1 1 auto"}
            borderRight={"1px solid rgba(145,158,171,0.2)"}
          >
            <Header
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              setSelectedDirectoryItem={setSelectedDirectoryItem}
              clearInput={clearInput}
            />
            {isExpanded && (
              <SearchBox
                handleSearchClear={handleSearchClear}
                handleSearchValueChange={handleSearchValueChange}
                searchValue={searchValue}
              />
            )}
            <UserDirectory
              isExpanded={isExpanded}
              handleChatStart={handleChatStart}
              combinedList={combinedList}
              loadMoreRef={loadMoreRef}
              hasMore={hasMore}
              loading={loading}
              loadingMore={loadingMore}
              debouncedSearchValue={debouncedSearchValue}
            />
          </Box>
        )}
        {isXs && (
          <MobileSideDrawer
            open={isExpanded}
            handleDrawer={() => setIsExpanded(false)}
            width={'calc(100vw - 32px)'}
            showCloseDialogIcon={false}
            header={
              <Box>
                <Header
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  toggleExpand={toggleExpand}
                  setSelectedDirectoryItem={setSelectedDirectoryItem}
                  clearInput={clearInput}
                />
                <SearchBox
                  handleSearchClear={handleSearchClear}
                  handleSearchValueChange={handleSearchValueChange}
                  searchValue={searchValue}
                />
              </Box>
            }
          >
            <UserDirectory
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              handleChatStart={handleChatStart}
              combinedList={combinedList}
              loadMoreRef={loadMoreRef}
              hasMore={hasMore}
              loading={loading}
              loadingMore={loadingMore}
              debouncedSearchValue={debouncedSearchValue}
            />
          </MobileSideDrawer>
        )}
      </Box>
    </>
  );
};
export default UserDirectoryPanel;
