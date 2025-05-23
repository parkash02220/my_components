import MyTextField from "@/components/MyTextfield/MyTextfield";
import useCreateCustomGroup from "@/hooks/chat/groupChat/useCreateCustomGroup";
import useSendMessage from "@/hooks/chat/useSendMessage";
import { getFullName } from "@/utils";
import { Box } from "@mui/material";

const TextMessage = ({
  isDisabled,
  isGroupChat,
  selectedUsers,
  handleChatStart,
}) => {
  const {
    loadingMessageSend,
    errorMessageSend,
    sendMessage,
    handleMessageChange,
    message,
    setMessage,
  } = useSendMessage();

  const {loadingCreateCustomGroup,errorCreateCustomGroup,createCustomGroup} = useCreateCustomGroup();

  const handleSendMessage = async (e) => {
    if (e.key === "Enter") {

      setMessage("");
      
      if ((selectedUsers || []).length === 0) {
        await sendMessage(isGroupChat);
        return;
      }
      
      if (selectedUsers?.length === 1) {
        const user = selectedUsers[0];
        await handleChatStart(user, "single_user_chat");
        await sendMessage(false);
        return;
      }

      if((selectedUsers || []).length > 1){
            const participantIds = selectedUsers?.map((user)=> user?.id);
            const name = selectedUsers
            ?.slice(0, 3)
            ?.reduce((acc, curr, index) => {
              const fullName = getFullName(curr?.firstName, curr?.lastName);
              return acc + (index > 0 ? ', ' : '') + fullName;
            }, '');

          const group =  await createCustomGroup(participantIds,name);
          await handleChatStart(group,"group__chat");
          await sendMessage(true,group);
      }
  };
}
  return (
    <>
      <Box width={"100%"}>
        <MyTextField
          fullWidth={true}
          border={"none"}
          label=""
          placeholder={"Type a message"}
          disabled={isDisabled}
          onChange={handleMessageChange}
          onKeyDown={handleSendMessage}
          value={message}
        />
      </Box>
    </>
  );
};
export default TextMessage;
