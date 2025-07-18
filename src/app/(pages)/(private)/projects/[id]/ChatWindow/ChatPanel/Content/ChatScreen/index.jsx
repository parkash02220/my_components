import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

const ChatScreen = ({
  selectedUsers,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
  status,
}) => {
  return (
    <>
      <Box
        minWidth={0}
        display={"flex"}
        flex={"1 1 auto"}
        flexDirection={"column"}
      >
        <MessageBox
        status={status}
        />
        <MessageInputBox
          selectedUsers={selectedUsers}
          onSendMessage={onSendMessage}
          onSendInputMessageChange={onSendInputMessageChange}
          sendMessageInputValue={sendMessageInputValue}
        />
      </Box>
    </>
  );
};
export default ChatScreen;
