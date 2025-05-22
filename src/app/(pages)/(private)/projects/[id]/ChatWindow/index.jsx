import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import { useChatContext } from "@/context/Chat/ChatContext";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import useStartChat from "@/hooks/chat/singleUserChat/useStartChat";

const ChatWindow = () => {
  const [chatType, setChatType] = useState("");
   useInitializeChatWindow();
  const {loadingStartChat,errorStartChat,startChat} = useStartChat();
  const [selectedDirectoryItem, setSelectedDirectoryItem] = useState(null);
  const { state } = useChatContext();
  const { loadingChatWindow } = state;
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
    if(type==="group__chat"){

    }else{
      startChat(data?.id);
    }
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
            handleChatStart={handleChatStart}
          />
          <ChatPanel
            chatType={chatType}
            selectedDirectoryItem={selectedDirectoryItem}
            loadingStartChat={loadingStartChat}
          />
        </Box>
      </Box>
    </>
  );
};
export default ChatWindow;
