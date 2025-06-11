const {
  default: useNotifications,
} = require("@/hooks/notifications/useNotifications");
const {
  useNotificationsSocket,
} = require("@/hooks/notifications/useNotificationsSocket");
const { IconButton, Typography } = require("@mui/material");
const { useState } = require("react");
import NotificationDrawer from "@/components/Header/NotificationDrawer";
import useGetNotificationCount from "@/hooks/notifications/useGetNotificationCount";
const HeaderNotifications = () => {
  useGetNotificationCount();
  useNotificationsSocket();

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
          boxSizing: "border-box",
          backgroundColor: "transparent",
          cursor: "pointer",
          textAlign: "center",
          fontSize: "24px",
          color: "#637381",
          outline: "0px",
          borderWidth: "0px",
          margin: "0px",
          textDecoration: "none",
          flex: "0 0 auto",
          padding: "8px",
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
            width: "24px",
            height: "24px",
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
              fontSize: 12,
              minWidth: 20,
              height: 20,
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
