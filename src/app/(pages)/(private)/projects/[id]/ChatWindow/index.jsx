import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import { useChatContext } from "@/context/Chat/ChatContext";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
import BackButton from "@/components/BackButton";
import * as actions from "@/context/Chat/action";
import useJoinRoomSocket from "@/hooks/chat/chatSockets/useJoinRoomSocket";
import useNewMessageSocket from "@/hooks/chat/chatSockets/useNewMessageSocket";
import useMarkAllMsgAsReadSocket from "@/hooks/chat/chatSockets/useMarkAllMsgAsReadSocket";
import useCreateChatRoom from "@/hooks/chat/useCreateChatRoom";
import useSendMessage from "@/hooks/chat/useSendMessage";
import useCreateCustomGroup from "@/hooks/chat/useCreateCustomGroup";
import { getFullName } from "@/utils";
import useGetAllDesignations from "@/hooks/organization/useGetAllDesignations";
import useGetAllDepartments from "@/hooks/organization/useGetAllDepartments";
const ChatWindow = ({ projectId }) => {
  const {isCHatWindowAvailable} = useInitializeChatWindow();
  const { joinRoom } = useJoinRoomSocket();
  useNewMessageSocket();
  const {
    loadingMessageSend,
    errorMessageSend,
    sendMessage,
    handleMessageChange,
    message,
    setMessage,
    clearInput,
  } = useSendMessage();

  const {
    loadingCreateCustomGroup,
    errorCreateCustomGroup,
    createCustomGroup,
  } = useCreateCustomGroup();


  const markAllMsgAsRead = useMarkAllMsgAsReadSocket();

  const { createChatRoom } = useCreateChatRoom();
  const [selectedDirectoryItem, setSelectedDirectoryItem] = useState(null);
  const {
    initMessages,
  } = useGetAllMessages(selectedDirectoryItem);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { state, dispatch } = useChatContext();
  const { loadingChatWindow,chatWindow } = state;
  const {chatRooms} = chatWindow;
  const allChatRooms = chatRooms?.allIds?.map(id => chatRooms?.byIds[id]);
  const chatRoomsWithSingleUser = allChatRooms?.filter((chatroom)=> !chatroom?.isGroup);
  const { allDesignations } = useGetAllDesignations();
  const { allDepartments } = useGetAllDepartments();
  const initializeChatRoom = async () => {
    if (selectedDirectoryItem) return selectedDirectoryItem;

    if (selectedUsers?.length === 1) {
      const user = selectedUsers[0];
      const isRoomAlreadyExists = chatRoomsWithSingleUser?.find((chatroom)=> chatroom?.targetUser?.id === user?.id);
      if(isRoomAlreadyExists?.id){
        return isRoomAlreadyExists;
      }
      const room = await createChatRoom(user?.id);
      // setSelectedDirectoryItem(room);
      // joinRoom(room?.id);
      return room;
    }

    if (selectedUsers?.length > 1) {
      const participantIds = selectedUsers.map((u) => u.id);
      const groupName = selectedUsers
        .slice(0, 3)
        .map((u) => getFullName(u.firstName, u.lastName))
        .join(", ");

      const group = await createCustomGroup(participantIds, groupName);
      return group;
    }

    return null;
  };

  const handleChatStart = async (chatRoom) => {
    if (!chatRoom?.id) return;

    if(selectedUsers?.length > 0){
      setSelectedUsers([]);
    }else{
      clearInput();
    }
    setSelectedDirectoryItem(chatRoom);
    joinRoom(chatRoom.id);
    markAllMsgAsRead(chatRoom.id);
    dispatch({ type: actions.SET_ACTIVE_CHAT_ROOM, payload: chatRoom });

    await initMessages(chatRoom.id);
  };
  const handleTextMessageSubmit = async () => {
    setMessage("");
    if(selectedUsers?.length > 0){
      setSelectedUsers([]);
    }
    if (selectedDirectoryItem?.id) {
      await sendMessage(selectedDirectoryItem);
      return;
    }
    const chatRoom = await initializeChatRoom();

    if (!chatRoom) return;

    await handleChatStart(chatRoom);
    await sendMessage(chatRoom);
  };

  if (loadingChatWindow || !isCHatWindowAvailable) {
    return (
      <Box height={"100%"}>
        <Loader />
      </Box>
    );
  }
  
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        mb={2}
      >
        <BackButton fontSize={16} path={`/projects/${projectId}`} />
      </Box>
      <Box
        className="chatWindow__container"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          padding: "8px 40px 64px 40px",
          minHeight: 0,
        }}
      >
        <Typography
          variant="h4"
          color="#1C252E"
          mb={5}
          fontSize={24}
          fontWeight={700}
        >
          Chat
        </Typography>
        <Box
          sx={{
            flex: " 1 1 0px",
            display: "flex",
            position: "relative",
            boxShadow:
              "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
            borderRadius: 2,
            background: "#FFFFFF",
            minHeight: 0,
          }}
        >
           <UserDirectoryPanel
            handleChatStart={handleChatStart}
            setSelectedDirectoryItem={setSelectedDirectoryItem}
            clearInput={clearInput}
          />
          <ChatPanel
            selectedDirectoryItem={selectedDirectoryItem}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            onSendMessage={handleTextMessageSubmit}
            onSendInputMessageChange={handleMessageChange}
            sendMessageInputValue={message}
          />
        </Box>
      </Box>
    </>
  );
};
export default ChatWindow;
