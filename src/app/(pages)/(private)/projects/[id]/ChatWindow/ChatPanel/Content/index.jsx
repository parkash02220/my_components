import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";

const Content = ({
  isExpanded,
  chatType,
  selectedDirectoryItem,
  selectedUsers,
  handleChatStart,
  setSelectedDirectoryItem,
}) => {
  return (
    <>
      <Box minHeight={0} flex={"1 1 auto"} display={"flex"}>
        <ChatScreen
          selectedDirectoryItem={selectedDirectoryItem}
          chatType={chatType}
          selectedUsers={selectedUsers}
          handleChatStart={handleChatStart}
          setSelectedDirectoryItem={setSelectedDirectoryItem}
        />
        {selectedDirectoryItem && (
          <ChatDetails
            isExpanded={isExpanded}
            chatType={chatType}
            selectedDirectoryItem={selectedDirectoryItem}
          />
        )}
      </Box>
    </>
  );
};
export default Content;
