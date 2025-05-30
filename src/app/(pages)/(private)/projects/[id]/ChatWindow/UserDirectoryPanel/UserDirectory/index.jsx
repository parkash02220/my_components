import { Box } from "@mui/material";
import UserDIrectoryItem from "./UserDIrectoryItem";
import React, { useMemo } from "react";
import { useChatContext } from "@/context/Chat/ChatContext";

const UserDirectory = ({ isExpanded, handleChatStart }) => {
  const { chatWindow } = useChatContext().state;
  const { usersWithoutChatRoom, chatRooms } = chatWindow;

  const combinedList = useMemo(() => {
    const chatroomItems = chatRooms?.allIds?.map(id => ({
      type: "chatroom",
      data: chatRooms.byIds[id],
    })) || [];
  
    const userItems = usersWithoutChatRoom?.allIds
      ?.filter(id => !chatRooms.allIds.some(roomId => {
        const room = chatRooms.byIds[roomId];
        return room?.targetUser?.id === id;
      }))
      .map(id => ({
        type: "user",
        data: usersWithoutChatRoom.byIds[id],
      })) || [];
  
    return [...chatroomItems, ...userItems];
  }, [chatRooms, usersWithoutChatRoom]);

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
      >
        <Box pb={1} display="flex" flexDirection="column">
          {combinedList.map(({ type, data }) => (
            <UserDIrectoryItem
              key={data?.id}
              isExpanded={isExpanded}
              chatroom={type === "chatroom" ? data : undefined}
              user={type === "user" ? data : undefined}
              handleChatStart={handleChatStart}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDirectory;
