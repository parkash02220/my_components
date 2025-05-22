import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";

const Content = ({
  isExpanded,
  chatType,
  selectedDirectoryItem,
  loadingStartChat,
}) => {
  return (
    <>
      <Box minHeight={0} flex={"1 1 auto"} display={"flex"}>
        <ChatScreen
          selectedDirectoryItem={selectedDirectoryItem}
          loadingStartChat={loadingStartChat}
          chatType={chatType}
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
