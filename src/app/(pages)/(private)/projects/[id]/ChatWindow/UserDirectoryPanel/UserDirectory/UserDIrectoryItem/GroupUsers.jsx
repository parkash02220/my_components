import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";
import { getFullName, getTimeAgo } from "@/utils";

const GroupUsers = ({ isExpanded, group, handleChatStart }) => {
  const avatar = group?.participants
    ?.slice(0, 2)
    ?.map((user) => user?.avatar || "");
  const handleItemClick = () => {
    handleChatStart(group, "group__chat");
  };
  console.log(":::group", group);
  const { lastMessage } = group;
  const isMsgUnread = lastMessage && !lastMessage?.isSentByActiveUser &&!lastMessage?.isSeenByActiveUser ;
  let lastMessageText="";
  if(lastMessage){
    const {sender} = lastMessage;
    const senderName = lastMessage?.isSentByActiveUser ? "You" :  getFullName(sender?.firstName,sender?.lastName);
   lastMessageText = `${senderName} : ${lastMessage?.text}`;
  }
  return (
    <>
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
          pt: "12px",
          pb: "12px",
          gap: 2,
          ":hover": {
            background: "rgba(145 158 171 / 0.08)",
          },
        }}
      >
        <UserWithStatus type={"group__chat"} avatar={avatar} />
        {isExpanded && (
          <>
            <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
              <Typography
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                fontWeight={600}
                fontSize={14}
                color="#1C252E"
              >
                {group?.name || ""}
              </Typography>
              {lastMessage && (
                <Typography
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  color="#637381"
                  fontSize={14}
                >
                  {lastMessageText}
                </Typography>
              )}
            </Box>
            <Box
              display={"flex"}
              alignSelf={"stretch"}
              alignItems={"flex-end"}
              flexDirection={"column"}
            >
              {lastMessage && (
                <Typography
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                fontSize={12}
                color="#919EAB"
                mb={"12px"}
              >
               {getTimeAgo(lastMessage?.updatedAt)}
              </Typography>
               )}
               {
                isMsgUnread && (
                  <Typography
                  width={8}
                  height={8}
                  borderRadius={"50%"}
                  bgcolor={"#00B8D9"}
                />
                )
               }
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
export default GroupUsers;
