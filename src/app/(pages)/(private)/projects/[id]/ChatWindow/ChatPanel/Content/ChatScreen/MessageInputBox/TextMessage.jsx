import MyTextField from "@/components/MyTextfield/MyTextfield";
import useSendMessage from "@/hooks/chat/useSendMessage";
import { Box } from "@mui/material";

const TextMessage = ({isDisabled}) => {
  const {loadingMessageSend,errorMessageSend,sendMessage,handleMessageChange,message,handleKeyDown} = useSendMessage();
  return (
    <>
    <Box width={'100%'}>
      <MyTextField
        fullWidth={true}
        border={"none"}
        label=""
        placeholder={"Type a message"}
        disabled={isDisabled}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        value={message}
      />
      </Box>
    </>
  );
};
export default TextMessage;
