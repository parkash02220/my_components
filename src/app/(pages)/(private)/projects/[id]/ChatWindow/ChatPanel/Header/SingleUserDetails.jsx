import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../components/UserWithStatus";
import { getFullName } from "@/utils";
import { useMemo } from "react";

const SingleUserDetails = ({ userDetails }) => {
  const user = userDetails?.targetUser;

  const fullName = useMemo(() => {
    return getFullName(user?.firstName, user?.lastName);
  }, [user?.firstName, user?.lastName]);

  return (
    <Box display="flex" gap={2} alignItems="center">
      <UserWithStatus
        width={40}
        height={40}
        type={userDetails?.isGroup}
        avatar={user?.avatar}
      />
      <Box flex="1 1 auto" minWidth={0}>
        <Typography color="#1C252E" fontSize={14} fontWeight={600} noWrap>
          {fullName}
        </Typography>
        <Typography color="#637381" fontSize={14} noWrap>
          always
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleUserDetails;
