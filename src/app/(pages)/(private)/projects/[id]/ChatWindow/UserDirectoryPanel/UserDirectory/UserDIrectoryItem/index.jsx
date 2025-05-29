import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";
import GroupUsers from "./GroupUsers";
import SingleUser from "./SingleUser";

export default function UserDIrectoryItem({
  isExpanded = true,
  chatroom = {},
  user = {},
  handleChatStart,
}) {
  return (
    <>
      { chatroom?.isGroup ? (
        <GroupUsers
          isExpanded={isExpanded}
          chatroom={chatroom}
          handleChatStart={handleChatStart}
        />
      ) : (
        <SingleUser
          isExpanded={isExpanded}
          chatroom={chatroom}
          handleChatStart={handleChatStart}
          userWithoutChatroom={user}
        />
      )}
    </>
  );
}
