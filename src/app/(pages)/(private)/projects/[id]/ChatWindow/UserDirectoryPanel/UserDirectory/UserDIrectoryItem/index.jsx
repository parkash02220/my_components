import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";
import GroupUsers from "./GroupUsers";
import SingleUser from "./SingleUser";

export default function UserDIrectoryItem({
  type,
  isExpanded = true,
  group = {},
  user = {},
  handleChatStart,
  onlineUsers=[],
}) {
  return (
    <>
      {type === "group__chat" ? (
        <GroupUsers
          isExpanded={isExpanded}
          group={group}
          handleChatStart={handleChatStart}
        />
      ) : (
        <SingleUser
          isExpanded={isExpanded}
          user={user}
          handleChatStart={handleChatStart}
          onlineUsers={onlineUsers}
        />
      )}
    </>
  );
}
