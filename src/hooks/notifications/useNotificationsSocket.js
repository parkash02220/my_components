import { useAppContext } from "@/context/AppContext";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as actions from "@/context/action";
import { convertIdFields } from "@/utils";
import useToast from "../common/useToast";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const useNotificationsSocket = () => {
  const toastId = "show_notification";
  const {showToast} = useToast();
  const { dispatch, state } = useAppContext();
  const { activeUser } = state;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!activeUser?.id) return;
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    socketRef.current.emit("register", activeUser.id);
    
    socketRef.current.on("notification", (data) => {
       const convertedIdResponse = convertIdFields(data || {});
       console.log("::data in socket",data)
       showToast({toastId,type:"info",message:data?.message || ""})
      dispatch({ type: actions.NEW_NOTIFICATION_RECEIVED, payload: {newNotification:convertedIdResponse} });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [activeUser?.id,showToast]);
};
