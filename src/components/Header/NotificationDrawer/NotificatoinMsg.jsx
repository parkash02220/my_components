import { useAppContext } from "@/context/App/AppContext";
import { getTimeAgo } from "@/utils";
import { Box, Typography } from "@mui/material";

const NotificatoinMsg = ({
  notification,
  type = "",
  handleNotificationClick,
}) => {
  const { state } = useAppContext();
  const userId = state?.activeUser?.id;
  const isUnread =
    type === "unread"
      ? true
      : !notification?.seenBy?.some(
          (item) => item?.user?.id === userId && item?.seen === true
        );

  return (
    <>
      <Box
        className="notification_msgBox"
        sx={{
          width: "100%",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          borderWidth: "0px 0px 0px",
          borderRadius: "0px",
          padding: "20px",
          borderBottom: "1px dashed rgba(145,158,171,0.2)",
          position: "relative",
          gap: 2,
          "&:hover": {
            background: "rgba(145,158,171,0.08)",
          },
        }}
        onClick={() => handleNotificationClick(isUnread, notification?.id)}
      >
        {isUnread && (
          <Box
            sx={{
              position: "absolute",
              top: "26px",
              right: "20px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00B8D9",
            }}
          />
        )}
        <Box
          className="notification_msgBox__left"
          sx={{ flexShrink: 0, minWidth: "auto" }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#F4F6F8",
            }}
          >
            <img
              src={notification?.sender?.avatar || '/dummyUser.svg'}
              alt="avatar"
               referrerPolicy="no-referrer"
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                objectFit: "cover",
                textIndent: "10000px",
              }}
            />
          </Box>
        </Box>
        <Box
          className="notification_msgBox__left"
          sx={{ minWidth: "0px", flex: "1 1 auto" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"4px"}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <Box>
              <Typography fontWeight={600} color="#1C252E" fontSize={14} mr={1}>
                {notification?.message || ""}
              </Typography>
            </Box>
            <Box>
              <Typography color="#919EAB" fontSize={12}>
                {getTimeAgo(notification?.updatedAt || notification?.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NotificatoinMsg;
