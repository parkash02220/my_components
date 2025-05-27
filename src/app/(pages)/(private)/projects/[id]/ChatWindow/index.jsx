import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import { useChatContext } from "@/context/Chat/ChatContext";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
import BackButton from "@/components/BackButton";
import useCreateChatRoom from "@/hooks/chat/singleUserChat/useCreateChatRoom";
import * as actions from "@/context/Chat/action";
import useJoinRoomSocket from "@/hooks/chat/singleUserChat/useJoinRoomSocket";
const ChatWindow = ({ projectId }) => {
  const {joinRoom} = useJoinRoomSocket({
    onRoomJoined: (data) => {
      console.log(":::🎉 Joined room:", data);
    },
    onUserTyping: (userId) => {
      console.log(":::✍️ Typing:", userId);
      // maybe set a state like setTypingUsers(prev => [...prev, userId])
    },
    onUserStoppedTyping: (userId) => {
      console.log(":::🛑 Stopped typing:", userId);
      // maybe remove from typingUsers state
    }
  });

  const { createChatRoom } = useCreateChatRoom();
  const { getAllMessages } = useGetAllMessages();
  const [chatType, setChatType] = useState("");
  useInitializeChatWindow();
  const [selectedDirectoryItem, setSelectedDirectoryItem] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { state, dispatch } = useChatContext();
  const { loadingChatWindow, onlineUsers } = state;
  if (loadingChatWindow) {
    return (
      <Box height={"100%"}>
        <Loader />
      </Box>
    );
  }
  const handleChatStart = async (data, type) => {
    setSelectedUsers([]);
    setChatType(type);
    setSelectedDirectoryItem(data);
    if (type === "group__chat") {
      joinRoom(data?.id);
      dispatch({ type: actions.SET_CHAT_ROOM, payload: data });
      await getAllMessages(data?.id, true);
    } else {
      if (data?.chatId) {
        joinRoom(data?.chatId);
        dispatch({
          type: actions.SET_CHAT_ROOM,
          payload: { id: data?.chatId, isGroup: false },
        });
        getAllMessages(data?.chatId, false);
      } else {
        const room = await createChatRoom(data?.id);
        joinRoom(room?.id);
        return room;
      }
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        mb={2}
      >
        <BackButton fontSize={16} path={`/projects/${projectId}`} />
      </Box>
      <Box
        className="chatWindow__container"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          padding: "8px 40px 64px 40px",
          minHeight: 0,
        }}
      >
        <Typography
          variant="h4"
          color="#1C252E"
          mb={5}
          fontSize={24}
          fontWeight={700}
        >
          Chat
        </Typography>
        <Box
          sx={{
            flex: " 1 1 0px",
            display: "flex",
            position: "relative",
            boxShadow:
              "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
            borderRadius: 2,
            background: "#FFFFFF",
            minHeight: 0,
          }}
        >
          <UserDirectoryPanel
            handleChatStart={handleChatStart}
            setSelectedDirectoryItem={setSelectedDirectoryItem}
            onlineUsers={onlineUsers}
          />
          <ChatPanel
            chatType={chatType}
            selectedDirectoryItem={selectedDirectoryItem}
            handleChatStart={handleChatStart}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setSelectedDirectoryItem={setSelectedDirectoryItem}
          />
        </Box>
      </Box>
    </>
  );
};
export default ChatWindow;
