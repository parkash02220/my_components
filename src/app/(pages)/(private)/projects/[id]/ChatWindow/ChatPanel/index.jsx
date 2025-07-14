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
  status,
}) => {
  const { isXs, isMd } = useResponsiveBreakpoints();
  const [isExpanded, setIsExpanded] = useState(!isMd);
  const toggleExpand = () => {
    setIsExpanded((pre) => !pre);
  };

  if (status === "idle" || status === "loading") {
    return (
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          flex: { xs: "1 0 100%", lg: "1 1 auto" },
          flexDirection: "column",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          flex: { xs: "1 0 100%", lg: "1 1 auto" },
          flexDirection: "column",
        }}
      >
        <Header
          toggleExpand={toggleExpand}
          chatWindow={chatWindow}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          status={status}
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
