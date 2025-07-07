import { Box, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import UserDirectoryPanel from "./UserDirectoryPanel";
import ChatPanel from "./ChatPanel";
import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader/Loader";
import { getFullName } from "@/utils";

import { useChatContext } from "@/context/Chat/ChatContext";
import * as actions from "@/context/Chat/action";

import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useInitializeChatWindow from "@/hooks/chat/useInitializeChatWindow";
import useManageActiveChatRoom from "@/hooks/chat/useManageActiveChatRoom";
import useChatHandlers from "@/hooks/chat/useChatHandlers";
import useSetupChatSockets from "@/hooks/chat/useSetupChatSockets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ChatWindow = ({ projectId }) => {
  const { isXs } = useResponsiveBreakpoints();
  const { isCHatWindowAvailable } = useInitializeChatWindow();
  const { state,dispatch } = useChatContext();
  const { loadingChatWindow, chatWindow } = state;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const allChatRooms = useMemo(
    () => chatWindow?.chatRooms?.allIds?.map((id) => chatWindow.chatRooms.byIds[id]) || [],
    [chatWindow?.chatRooms]
  );
  const chatRoomsWithSingleUser = useMemo(
    () => allChatRooms.filter(room => !room?.isGroup),
    [allChatRooms]
  );

  const [selectedUsers, setSelectedUsers] = useState([]);

  const { joinRoom, markAllMsgAsRead, initMessages } = useSetupChatSockets();

  const { activeChatRoom, removeActiveChatRoom } = useManageActiveChatRoom(
    allChatRooms,
    joinRoom,
    markAllMsgAsRead,
    initMessages
  );

  const {
    message,
    handleMessageChange,
    sendMessage,
    clearInput,
    createChatRoom,
    createCustomGroup
  } = useChatHandlers();

  const initializeChatRoom = async () => {
    if (activeChatRoom) return activeChatRoom;

    if (selectedUsers.length === 1) {
      const user = selectedUsers[0];
      const existingRoom = chatRoomsWithSingleUser.find(room => room?.targetUser?.id === user?.id);
      if (existingRoom) return existingRoom;

      return await createChatRoom(user.id);
    }

    if (selectedUsers.length > 1) {
      const participantIds = selectedUsers.map(u => u.id);
      const groupName = selectedUsers.slice(0, 3).map(u => getFullName(u.firstName, u.lastName)).join(", ");
      return await createCustomGroup(participantIds, groupName);
    }

    return null;
  };

  const handleChatStart = async (chatRoom) => {
    if (!chatRoom?.id) return;
    setSelectedUsers([]);
  
    const params = new URLSearchParams(searchParams.toString());
    params.set("chatRoomId", chatRoom.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  

  const handleTextMessageSubmit = async () => {
    setSelectedUsers([]);

    if (activeChatRoom?.id) {
      await sendMessage(activeChatRoom);
      return;
    }

    const newRoom = await initializeChatRoom();
    if (newRoom) {
      await handleChatStart(newRoom);
      await sendMessage(newRoom);
    }
  };

  if (loadingChatWindow || !isCHatWindowAvailable) {
    return <Box height="100%"><Loader /></Box>;
  }

  return (
    <Box display="flex" flexDirection="column" flex="1 1 auto" minHeight={0}>
      <Box display="flex" alignItems="center" mb={isXs ? 1 : 2}>
        <BackButton fontSize={16} path={`/projects/${projectId}`} text={isXs ? "Chat" : "Back"} />
      </Box>
      <Box
        className="chatWindow__container"
        sx={{
          flex: "1 1 0px",
          display: "flex",
          flexDirection: "column",
          padding: isXs ? "8px 8px 16px 8px" : "8px 40px 64px 40px",
        }}
      >
        {!isXs && (
          <Typography variant="h4" color="#1C252E" mb={isXs ? 2 : 5} fontSize={isXs ? 18 : 24} fontWeight={700}>
            Chat
          </Typography>
        )}
        <Box
          sx={{
            flex: "1 1 0px",
            display: "flex",
            boxShadow: "0 0 2px 0 rgba(145 158 171 / 0.2), 0 12px 24px -4px rgba(145 158 171 / 0.12)",
            borderRadius: 2,
            background: "#FFFFFF",
            position: "relative",
            minHeight: 0,
          }}
        >
          <UserDirectoryPanel
            handleChatStart={handleChatStart}
            clearInput={clearInput}
            removeActiveChatRoom={removeActiveChatRoom}
          />
          <ChatPanel
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            onSendMessage={handleTextMessageSubmit}
            onSendInputMessageChange={handleMessageChange}
            sendMessageInputValue={message}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
