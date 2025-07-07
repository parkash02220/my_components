import ConfirmationPopup from "@/components/ConfirmationPopup";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useClearNotifications from "@/hooks/notifications/useClearNotifications";
import useMarkAllNotificationAsRead from "@/hooks/notifications/useMarkAllNotificationAsRead";
import { ExpandLess } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export const Header = ({ currentTab, totalCount, unReadCount,handleDrawer }) => {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const showMarkAllAsReadButton = currentTab === "unread";
  const { isDownXs } = useResponsiveBreakpoints();
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
        pb={isDownXs ? "0px" : "16px"}
        pt={isDownXs ? "0px" : "16px"}
        pl={isDownXs ? "8px" : "20px"}
        pr={isDownXs ? "8px" : "20px"}
        minHeight={68}
        alignItems={"center"}
      >
        <Box flexGrow={1}>
          {isDownXs && (
            <ExpandLess
              onClick={handleDrawer}
              sx={{
                transform: "rotate(270deg)",
                color: "#1C252E",
              }}
            />
          )}
          <Typography variant="title" fontWeight={600}>
            Notifications
          </Typography>
        </Box>
        <Box display={"flex"}>
          {showMarkAllAsReadButton && (
            <IconButton
              disabled={unReadCount === 0}
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
                style={{
                  width: isDownXs ? "16px" : "20px",
                  height: isDownXs ? "16px" : "20px",
                  flexShrink: 0,
                }}
              />
            </IconButton>
          )}
          <MyTooltip title={"Delete notifications"} placement="bottom">
            <IconButton
              disabled={totalCount === 0}
              onClick={handleDeletePopupOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                fontSize: "1.5rem",
                color: "#637381",
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
                style={{
                  width: isDownXs ? "16px" : "20px",
                  height: isDownXs ? "16px" : "20px",
                  flexShrink: 0,
                }}
              />
            </IconButton>
          </MyTooltip>
        </Box>
      </Box>
    </>
  );
};
