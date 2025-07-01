import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";

const Content = ({
  isExpanded,
  setIsExpanded,
  selectedDirectoryItem,
  selectedUsers,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
}) => {
  return (
    <>
      <Box minHeight={0} flex={"1 1 auto"} display={"flex"}>
        <ChatScreen
          selectedDirectoryItem={selectedDirectoryItem}
          selectedUsers={selectedUsers}
          onSendMessage={onSendMessage}
          onSendInputMessageChange={onSendInputMessageChange}
          sendMessageInputValue={sendMessageInputValue}
        />
        {selectedDirectoryItem && (
          <ChatDetails
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            selectedDirectoryItem={selectedDirectoryItem}
          />
        )}
      </Box>
    </>
  );
};
export default Content;
