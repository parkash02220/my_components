import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../components/UserWithStatus";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { getFullName } from "@/utils";
import { useMemo } from "react";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";

const GroupUsersDetails = ({ groupDetails }) => {
  const {fontSize,iconSize} = useResponsiveValue();
  const {isXs} = useResponsiveBreakpoints();
  const users = groupDetails?.participants || [];

  const visibleUsers = useMemo(() => {
    return users.length > 3 ? users.slice(0, 2) : users.slice(0, 3);
  }, [users]);

  const extraUsers = useMemo(() => {
    return users.length > 3 ? users.slice(2) : [];
  }, [users]);

  const renderExtraUsersTooltip = () => (
    <MyTooltip
      content={
        <Box display="flex" flexDirection="column" gap={1} p={1}>
          {users.map((user, index) => {
            const name = getFullName(user?.firstName, user?.lastName);
            return (
              <Box
                key={user?.id || index}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <img
                  src={user?.avatar || "/dummyUser.svg"}
                  alt={name}
                  referrerPolicy="no-referrer"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography fontSize={isXs ? 10 : 12} fontWeight={500} color="white">
                  {name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      }
    >
      <Box
        fontSize={isXs ? 10 : 12}
        color="#007867"
        width={isXs ? 24 : 32}
        height={isXs ? 24 : 32}
        fontWeight={600}
        ml="-8px"
        position="relative"
        border="2px solid #FFFFFF"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        overflow="hidden"
        sx={{ background: "#C8FAD6" }}
      >
        +{users.length - 2}
      </Box>
    </MyTooltip>
  );

  return (
    <Box display="flex" flexDirection="row-reverse" justifyContent="flex-end">
      {users.length > 3 && renderExtraUsersTooltip()}
      {users.length > 0 && (
        <Box display="flex">
          {visibleUsers.map((user, index) => {
            const name = getFullName(user?.firstName, user?.lastName);
            return (
              <MyTooltip
                key={user?.id || index}
                title={name}
                placement="bottom"
              >
                <Box
                  width={isXs ? 24 : 32}
                  height={isXs ? 24 : 32}
                  border="2px solid #FFFFFF"
                  ml="-8px"
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="50%"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <img
                    src={user?.avatar || "/dummyUser.svg"}
                    alt={name}
                    referrerPolicy="no-referrer"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      color: "transparent",
                      textIndent: "100000px",
                      maxWidth: "100%",
                    }}
                  />
                </Box>
              </MyTooltip>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default GroupUsersDetails;
