import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

const ChatScreen = ({
  selectedDirectoryItem,
  chatType,
  selectedUsers,
  handleChatStart,
  setSelectedDirectoryItem,
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
        />
        <MessageInputBox
          chatType={chatType}
          selectedUsers={selectedUsers}
          selectedDirectoryItem={selectedDirectoryItem}
          handleChatStart={handleChatStart}
          setSelectedDirectoryItem={setSelectedDirectoryItem}
        />
      </Box>
    </>
  );
};
export default ChatScreen;
