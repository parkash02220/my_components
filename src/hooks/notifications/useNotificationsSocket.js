import { useAppContext } from "@/context/App/AppContext";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as actions from "@/context/Notifications/action";
import { convertIdFields } from "@/utils";
import useToast from "../common/useToast";
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const useNotificationsSocket = () => {
  const toastId = "show_notification";
  const {showToast} = useToast();
  const { state } = useAppContext();
  const {dispatch} = useNotificationContext();
  const { activeUser } = state;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!activeUser?.id) return;
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    socketRef.current.emit("register", activeUser.id);
    
    socketRef.current.on("notification", (data) => {
       const convertedIdResponse = convertIdFields(data || {});
       showToast({toastId,type:"info",message:data?.message || ""})
      dispatch({ type: actions.NEW_NOTIFICATION_RECEIVED, payload: {newNotification:convertedIdResponse} });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [activeUser?.id,showToast]);
};
