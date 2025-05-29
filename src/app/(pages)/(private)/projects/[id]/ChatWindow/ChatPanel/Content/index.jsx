import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";

const Content = ({
  isExpanded,
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
            selectedDirectoryItem={selectedDirectoryItem}
          />
        )}
      </Box>
    </>
  );
};
export default Content;
