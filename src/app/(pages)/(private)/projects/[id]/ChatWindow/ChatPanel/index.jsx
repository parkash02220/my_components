import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const ChatPanel = ({
  chatWindow,
  selectedUsers,
  setSelectedUsers,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
}) => {
  const {isXs} = useResponsiveBreakpoints();
  const [isExpanded, setIsExpanded] = useState(!isXs);
  const toggleExpand = () => {
    setIsExpanded((pre) => !pre);
  };
  return (
    <>
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          flex:{xs:'1 0 100%',sm:"1 1 auto"} ,
          flexDirection: "column",
        }}
      >
        <Header
          toggleExpand={toggleExpand}
          chatWindow={chatWindow}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <Content
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
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
