import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../components/UserWithStatus";
import { getFullName } from "@/utils";
import { useMemo } from "react";
import { useChatContext } from "@/context/Chat/ChatContext";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const SingleUserDetails = ({ userDetails }) => {
  const user = userDetails?.targetUser;
  const {isXs} = useResponsiveBreakpoints();
  const { onlineUsers } = useChatContext().state;
  const fullName = useMemo(() => {
    return getFullName(user?.firstName, user?.lastName);
  }, [user?.firstName, user?.lastName]);

  const isOnline = useMemo(
    () => onlineUsers?.includes(user?.id),
    [onlineUsers, user]
  );

  return (
    <Box display="flex" gap={2} alignItems="center" flex={'1 1 auto'} minWidth={0}>
      <UserWithStatus
        width={isXs ? 30 : 40}
        height={isXs ? 30 : 40}
        type={userDetails?.isGroup}
        avatar={user?.avatar}
      />
      <Box flex="1 1 auto" minWidth={0}>
        <Typography variant="primary" fontWeight={600} noWrap overflow={'hidden'} textOverflow={'ellipsis'} display={'block'} maxWidth={'100%'}>
          {fullName}
        </Typography>
        <Typography color={ isOnline ? "green" : "#637381"} fontSize={isXs ? 10 : 12} fontWeight={500} noWrap>
         {isOnline ? "Online" : "Offline"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleUserDetails;
