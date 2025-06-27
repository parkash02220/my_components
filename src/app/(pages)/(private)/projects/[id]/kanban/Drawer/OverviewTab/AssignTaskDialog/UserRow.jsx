import MyButton from "@/components/MyButton/MyButton";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, Typography, useTheme } from "@mui/material";

const UserRow = ({ user, isAssigned, onToggle, loading }) => {
    const theme = useTheme();
    const {isXs,isSm} = useResponsiveBreakpoints();
    const {fontSize} = useResponsiveValue();
    return (
      <Box
        className="assignDialog__contactBox"
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="cotactBox__avatarBox" width={isXs ? 30 : 40} height={isXs ? 30 : 40}>
          <AvatarBox src={user?.avatar} />
        </Box>
        <Box
          className="cotactBox__dataBox"
          flex="1 1 auto"
          minWidth={0}
          margin={0}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography
            variant="primary"
            fontWeight={600}
          >{`${user?.firstName || ""} ${user?.lastName || ""}`}</Typography>
          <Typography variant="secondary">
            {user?.email || ""}
          </Typography>
        </Box>
        <Box className="cotactBox__actionBox">
          <MyButton
            backgroundColor="inherit"
            loading={loading}
            onClick={() => onToggle(user?.id, isAssigned)}
            fontWeight={700}
            sx={{ height: "30px" }}
            borderRadius="8px"
            padding="4px"
            fontSize={isXs ? "10px" : "13px"}
            minWidth="64px"
            variant="text"
            color={
              isAssigned ? "#00A76F" : theme.palette.primary.main
            }
            hoverBgColor={
              isAssigned
                ? "rgba(0,167,111,0.08)"
                : "rgba(145,158,171,0.08)"
            }
          >
            <img
              src={
                isAssigned
                  ? "/assingedIcon.svg"
                  : "/assignPlusIcon.svg"
              }
              alt="assign"
              style={{
                width: isXs ? "12px" : "16px",
                height: isXs ? "12px" :  "16px",
                marginRight: "4px",
              }}
            />
            {isAssigned ? "Assigned" : "Assign"}
          </MyButton>
        </Box>
      </Box>
    );
  };
export default UserRow;  

const AvatarBox = ({ src, alt = "user" }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      overflow="hidden"
      sx={{
        width: {xs:30,sm:40},
        height: {xs:30,sm:40},
        fontSize:{xs:14,sm:16,lg:18}
      }}
    >
      <img
        src={src || "/dummyUser.svg"}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          color: "transparent",
        }}
      />
    </Box>
  );
  