import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

const ChatScreen = ({
  selectedDirectoryItem,
  chatType,
  loadingStartChat,
  loadingStartGroupChat,
  selectedUsers,
  handleChatStart,
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
          selectedDirectoryItem={selectedDirectoryItem}
          chatType={chatType}
          loadingStartChat={loadingStartChat}
          loadingStartGroupChat={loadingStartGroupChat}
        />
        <MessageInputBox
          chatType={chatType}
          selectedUsers={selectedUsers}
          selectedDirectoryItem={selectedDirectoryItem}
          handleChatStart={handleChatStart}
        />
      </Box>
    </>
  );
};
export default ChatScreen;
