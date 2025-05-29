import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const ChatPanel = ({
  chatWindow,
  selectedDirectoryItem,
  selectedUsers,
  setSelectedUsers,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => {
    setIsExpanded((pre) => !pre);
  };
  return (
    <>
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
        }}
      >
        <Header
          toggleExpand={toggleExpand}
          chatWindow={chatWindow}
          selectedDirectoryItem={selectedDirectoryItem}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <Content
          isExpanded={isExpanded}
          selectedDirectoryItem={selectedDirectoryItem}
          selectedUsers={selectedUsers}
          onSendMessage={onSendMessage}
          onSendInputMessageChange={onSendInputMessageChange}
          sendMessageInputValue={sendMessageInputValue}
        />
      </Box>
    </>
  );
};
export default ChatPanel;
