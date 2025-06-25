import { useEffect } from "react";
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";
import * as actions from "@/context/Notifications/action";
import { convertIdFields } from "@/utils";
import { useSocketContext } from "@/context/Socket/SocketContext";
import useToast from "@/hooks/common/useToast";

export const useNotificationsSocket = () => {
  const socket = useSocketContext();
  const { dispatch } = useNotificationContext();
  const { showToast } = useToast();
  const toastId = "show_notification";

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      const convertedData = convertIdFields(data || {});
      showToast({ toastId, type: "info", message: data?.message || "" });
      dispatch({
        type: actions.NEW_NOTIFICATION_RECEIVED,
        payload: { newNotification: convertedData },
      });
    };

    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);
};
