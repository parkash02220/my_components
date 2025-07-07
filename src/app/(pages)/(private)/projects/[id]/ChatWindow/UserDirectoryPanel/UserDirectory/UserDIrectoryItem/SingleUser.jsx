import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";
import { getFullName, getTimeAgo } from "@/utils";
import { useChatContext } from "@/context/Chat/ChatContext";
import { useMemo } from "react";
import useCreateChatRoom from "@/hooks/chat/useCreateChatRoom";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";

const SingleUser = ({
  isExpanded,
  chatroom,
  userWithoutChatroom,
  handleChatStart,
}) => {
  const {isXs} = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
  const { createChatRoom } = useCreateChatRoom();
  const user = chatroom?.targetUser || userWithoutChatroom;
  const { firstName, lastName, avatar, id: userId } = user || {};

  const { onlineUsers } = useChatContext().state;

  const userName = useMemo(
    () => getFullName(firstName, lastName) || "",
    [firstName, lastName]
  );
  const isOnline = useMemo(
    () => onlineUsers?.includes(userId),
    [onlineUsers, userId]
  );

  const { lastMessage } = chatroom || {};
  const isMsgUnread =
    lastMessage &&
    !lastMessage?.isSentByActiveUser &&
    !lastMessage?.isSeenByActiveUser;

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return "";
    const sender = lastMessage.sender;
    const senderName = lastMessage?.isSentByActiveUser
      ? "You"
      : getFullName(sender?.firstName, sender?.lastName);
    return `${senderName}: ${lastMessage?.text}`;
  }, [lastMessage]);

  const handleItemClick = async () => {
    let room = chatroom
    if(!room?.id){
       room = await createChatRoom(user?.id);
    }
    await handleChatStart(room);
  };

  return (
    <Box
      onClick={handleItemClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        minWidth: 0,
        width: "100%",
        paddingInline: "20px",
        pt: isXs ? '4px' : "12px",
        pb: isXs ? '4px' :  "12px",
        gap: 2,
        ":hover": {
          background: "rgba(145 158 171 / 0.08)",
        },
      }}
    >
      <UserWithStatus avatar={avatar || ""} isOnline={isOnline} />
      { isExpanded && (
        <>
          <Box sx={{ flex: "1 1 auto", minWidth: 0,display:'flex',flexDirection:'column' }}>
            <Typography
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontWeight={600}
              variant="primary"
            >
              {userName}
            </Typography>
            {lastMessage && (
              <Typography
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                variant="secondary"
              >
                {lastMessageText}
              </Typography>
            )}
          </Box>
          <Box
            display="flex"
            alignSelf="stretch"
            alignItems="flex-end"
            flexDirection="column"
          >
            {lastMessage && (
              <Typography
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize={isXs ? 10 : 12}
                color="#919EAB"
                mb="12px"
              >
                {getTimeAgo(lastMessage?.updatedAt)}
              </Typography>
            )}
            {isMsgUnread && (
              <Box width={8} height={8} borderRadius="50%" bgcolor="#00B8D9" />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleUser;
