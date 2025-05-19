import MyButton from "@/components/MyButton/MyButton";
import { Box, Typography, useTheme } from "@mui/material";

const UserRow = ({ user, isAssigned, onToggle, loading }) => {
    const theme = useTheme();
    return (
      <Box
        className="assignDialog__contactBox"
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="cotactBox__avatarBox" width={40} height={40}>
          <AvatarBox src={user?.avatar} />
        </Box>
        <Box
          className="cotactBox__dataBox"
          flex="1 1 auto"
          minWidth={0}
          margin={0}
        >
          <Typography
            color={theme.palette.primary.main}
            fontWeight={600}
            fontSize="14px"
          >{`${user?.firstName || ""} ${user?.lastName || ""}`}</Typography>
          <Typography color="#637381" fontSize="14px">
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
            fontSize="13px"
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
                width: "16px",
                height: "16px",
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
      width={40}
      height={40}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      overflow="hidden"
      fontSize="1.25rem"
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
  