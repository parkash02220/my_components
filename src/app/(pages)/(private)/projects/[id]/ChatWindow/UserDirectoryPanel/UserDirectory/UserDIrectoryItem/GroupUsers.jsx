import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";
import { getFullName, getTimeAgo } from "@/utils";
import { useMemo } from "react";

const GroupUsers = ({ isExpanded, chatroom, handleChatStart }) => {
  const { name = "", participants = [], lastMessage } = chatroom || {};

  const avatars = useMemo(
    () => participants.slice(0, 2).map((user) => user?.avatar || ""),
    [participants]
  );

  const isMsgUnread = useMemo(() => {
    return (
      lastMessage &&
      !lastMessage?.isSentByActiveUser &&
      !lastMessage?.isSeenByActiveUser
    );
  }, [lastMessage]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return "";
    const { sender, isSentByActiveUser, text } = lastMessage;
    const senderName = isSentByActiveUser
      ? "You"
      : getFullName(sender?.firstName, sender?.lastName);
    return `${senderName}: ${text}`;
  }, [lastMessage]);

  const handleItemClick = () => {
    handleChatStart(chatroom);
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
        px: "20px",
        pt: "12px",
        pb: "12px",
        gap: 2,
        ":hover": {
          background: "rgba(145 158 171 / 0.08)",
        },
      }}
    >
      <UserWithStatus type="group__chat" avatar={avatars} />
      {isExpanded && (
        <>
          <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
            <Typography noWrap fontWeight={600} fontSize={14} color="#1C252E">
              {name}
            </Typography>
            {lastMessage && (
              <Typography noWrap fontSize={14} color="#637381">
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
              <Typography noWrap fontSize={12} color="#919EAB" mb="12px">
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

export default GroupUsers;
