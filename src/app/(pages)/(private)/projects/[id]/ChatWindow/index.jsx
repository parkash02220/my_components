import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import { useChatContext } from "@/context/Chat/ChatContext";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import useStartChat from "@/hooks/chat/singleUserChat/useStartChat";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
import useStartGroupChat from "@/hooks/chat/groupChat/useStartGroupChat";
import BackButton from "@/components/BackButton";

const ChatWindow = ({projectId}) => {
  const [chatType, setChatType] = useState("");
   useInitializeChatWindow();
  const {loadingStartChat,errorStartChat,startChat} = useStartChat();
  const {loadingStartGroupChat,startGroupChat} = useStartGroupChat();
  const [selectedDirectoryItem, setSelectedDirectoryItem] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { state } = useChatContext();
  const { loadingChatWindow } = state;
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
    if(type==="group__chat"){
     return startGroupChat(data)
    }else{
      return startChat(data?.id);
    }
  };
  return (
    <>
    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} mb={2}>
      <BackButton fontSize={16} path={`/projects/${projectId}`}/>
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
          />
          <ChatPanel
            chatType={chatType}
            selectedDirectoryItem={selectedDirectoryItem}
            loadingStartChat={loadingStartChat}
            loadingStartGroupChat={loadingStartGroupChat}
            handleChatStart={handleChatStart}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </Box>
      </Box>
    </>
  );
};
export default ChatWindow;
