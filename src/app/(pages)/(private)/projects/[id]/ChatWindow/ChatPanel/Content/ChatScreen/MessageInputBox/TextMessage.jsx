import MyTextField from "@/components/MyTextfield/MyTextfield";
import { Box } from "@mui/material";
const TextMessage = ({
  isDisabled,
  onSendMessage,
  onSendInputMessageChange,
  sendMessageInputValue,
}) => {

  const handleSendMessage = async (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <>
      <Box width={"100%"}>
        <MyTextField
          fullWidth={true}
          border={"none"}
          label=""
          placeholder={"Type a message"}
          disabled={isDisabled}
          onChange={onSendInputMessageChange}
          onKeyDown={handleSendMessage}
          value={sendMessageInputValue}
        />
      </Box>
    </>
  );
};
export default TextMessage;
