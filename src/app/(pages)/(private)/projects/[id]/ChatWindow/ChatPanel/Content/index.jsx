import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";
import { useChatContext } from "@/context/Chat/ChatContext";

const Content = ({
  isExpanded,
  setIsExpanded,
  selectedUsers,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
  status,
}) => {
  const {activeChatRoom} = useChatContext()?.state;
  return (
    <>
      <Box minHeight={0} flex={"1 1 auto"} display={"flex"}>
        <ChatScreen
          selectedUsers={selectedUsers}
          onSendMessage={onSendMessage}
          onSendInputMessageChange={onSendInputMessageChange}
          sendMessageInputValue={sendMessageInputValue}
           status={status}
        />
        {(activeChatRoom || status === "success") && (
          <ChatDetails
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
             status={status}
          />
        )}
      </Box>
    </>
  );
};
export default Content;
