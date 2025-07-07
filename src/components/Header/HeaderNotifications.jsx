const {
  default: useNotifications,
} = require("@/hooks/notifications/useNotifications");

const { IconButton, Typography } = require("@mui/material");
const { useState } = require("react");
import NotificationDrawer from "@/components/Header/NotificationDrawer";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import useGetNotificationCount from "@/hooks/notifications/useGetNotificationCount";
import { useNotificationsSocket } from "@/hooks/sockets/notifications/useNotificationsSocket";
const HeaderNotifications = () => {
  useGetNotificationCount();
  useNotificationsSocket();
  const {iconSize} = useResponsiveValue();
  const { isDownXs } = useResponsiveBreakpoints();
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const {
    notifications,
    loadingNotifications,
    errorNotifications,
    fetchNotifications,
    totalCount,
    unReadCount,
    loadMoreRef,
    hasMore,
    clearNotifications,
    page,
  } = useNotifications(notificationDrawerOpen);
  const handleNotificationDrawerOpen = async () => {
    setNotificationDrawerOpen(true);
    await fetchNotifications(true);
  };

  const handleNotificationDrawerClose = () => {
    clearNotifications();
    setNotificationDrawerOpen(false);
  };
  return (
    <>
      <NotificationDrawer
        open={notificationDrawerOpen}
        handleDrawer={handleNotificationDrawerClose}
        totalCount={totalCount}
        notifications={notifications}
        unReadCount={unReadCount}
        loadingNotifications={loadingNotifications}
        loadMoreRef={loadMoreRef}
        hasMore={hasMore}
        page={page}
      />
      <IconButton
        onClick={handleNotificationDrawerOpen}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: "24px",
          color: "#637381",
          outline: "0px",
          borderWidth: "0px",
          margin: "0px",
          marginTop:"5px",
          textDecoration: "none",
          flex: "0 0 auto",
          borderRadius: "50%",
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "rgba(99,115,129,0.08)",
            scale: 1.2,
          },
        }}
      >
        <img
          src={"/notificationIcon.svg"}
          alt={"notification"}
          style={{
            width: iconSize,
            height: iconSize,
            flexShrink: 0,
            display: "inline-flex",
          }}
        />
        {unReadCount > 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              fontWeight: 500,
              fontSize: isDownXs ? 10 : 12,
              minWidth: isDownXs ? 16 : 20,
              height: isDownXs ? 16 : 20,
              zIndex: 1,
              background: "#FF5630",
              color: "#FFFFFF",
              top: "8px",
              right: "4px",
              transform: "scale(1) translate(50%,-50%)",
              transformOrigin: "100% 0%",
              padding: "0px 6px",
              borderRadius: "10px",
            }}
          >
            {unReadCount || 0}
          </Typography>
        )}
      </IconButton>
    </>
  );
};
export default HeaderNotifications;
