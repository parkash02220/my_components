import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import { useChatContext } from "@/context/Chat/ChatContext";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";

const ChatWindow = ({ projectId }) => {
  const [chatType, setChatType] = useState("");
  const { initializeChatWindow } = useInitializeChatWindow(projectId);
  const [selectedDirectoryItem, setSelectedDirectoryItem] = useState(null);
  const { state } = useChatContext();
  const { loadingChatWindow, errorChatWindow, chatWindow } = state;
  if (loadingChatWindow) {
    return (
      <Box height={"100%"}>
        <Loader />
      </Box>
    );
  }
  const handleChatStart = (data, type) => {
    setChatType(type);
    setSelectedDirectoryItem(data);
  };
  return (
    <>
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
            chatWindow={chatWindow}
            handleChatStart={handleChatStart}
          />
          <ChatPanel
            chatType={chatType}
            selectedDirectoryItem={selectedDirectoryItem}
          />
        </Box>
      </Box>
    </>
  );
};
export default ChatWindow;
