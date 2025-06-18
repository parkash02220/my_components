import ConfirmationPopup from "@/components/ConfirmationPopup";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import useClearNotifications from "@/hooks/notifications/useClearNotifications";
import useMarkAllNotificationAsRead from "@/hooks/notifications/useMarkAllNotificationAsRead";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export const Header = ({ currentTab, totalCount, unReadCount }) => {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const showMarkAllAsReadButton = currentTab === "unread";
  const {
    loadingMarkAllAsRead,
    errorMarkAllAsRead,
    markAllNotificationsAsRead,
  } = useMarkAllNotificationAsRead();
  const {
    loading: loadingDeleteNotifications,
    error: errorDeleteNotifications,
    clearNotification,
  } = useClearNotifications();
  const handleMarkAllAsReadButton = async () => {
    await markAllNotificationsAsRead();
  };
  const handleDeletePopupOpen = () => {
    setDeletePopupOpen(true);
  };
  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };
  const handleNotificationsDeleteButton = async () => {
    await clearNotification();
    handleDeletePopupClose();
  };
  return (
    <>
      {deletePopupOpen && (
        <ConfirmationPopup
          title={"Delete Notifications"}
          handleClose={handleDeletePopupClose}
          open={deletePopupOpen}
          message={"all notifications."}
          type={"delete"}
          submitAction={handleNotificationsDeleteButton}
          loading={loadingDeleteNotifications}
        />
      )}
      <Box
        display={"flex"}
        padding={"16px 8px 16px 20px"}
        minHeight={68}
        alignItems={"center"}
      >
        <Box flexGrow={1}>
          <Typography
            color="#1C252E"
            variant="h6"
            fontSize={18}
            fontWeight={600}
          >
            Notifications
          </Typography>
        </Box>
        <Box display={"flex"}>
          {showMarkAllAsReadButton && (
            <IconButton
              disabled={totalCount === 0}
              onClick={handleMarkAllAsReadButton}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                fontSize: "1.5rem",
                color: "#00A76F",
                padding: "8px",
                borderRadius: "50%",
                overflow: "hidden",
                "&:hover": {
                  background: "rgba(0,167,111,0.08)",
                },
              }}
            >
              <img
                src="/markAllReadIcon.svg"
                alt="mark all as read"
                style={{ width: "20px", height: "20px", flexShrink: 0 }}
              />
            </IconButton>
          )}
          <MyTooltip title={"Delete notifications"} placement="bottom">
            <IconButton
              disabled={unReadCount === 0}
              onClick={handleDeletePopupOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                fontSize: "1.5rem",
                color: "#637381",
                padding: "8px",
                borderRadius: "50%",
                overflow: "hidden",
                "&:hover": {
                  background: "rgba(99,115,129,0.08)",
                },
              }}
            >
              <img
                src="/delete.svg"
                alt="mark all as read"
                style={{ width: "20px", height: "20px", flexShrink: 0 }}
              />
            </IconButton>
          </MyTooltip>
        </Box>
      </Box>
    </>
  );
};
