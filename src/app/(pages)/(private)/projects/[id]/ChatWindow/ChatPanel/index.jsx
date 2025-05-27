import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const ChatPanel = ({
  chatWindow,
  chatType,
  selectedDirectoryItem,
  handleChatStart,
  selectedUsers,
  setSelectedUsers,
  setSelectedDirectoryItem,
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
          chatType={chatType}
          selectedDirectoryItem={selectedDirectoryItem}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <Content
          isExpanded={isExpanded}
          chatType={chatType}
          selectedDirectoryItem={selectedDirectoryItem}
          selectedUsers={selectedUsers}
          handleChatStart={handleChatStart}
          setSelectedDirectoryItem={setSelectedDirectoryItem}
        />
      </Box>
    </>
  );
};
export default ChatPanel;
