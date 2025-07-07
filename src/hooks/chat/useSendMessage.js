import { useState, useRef } from "react";
import { useChatContext } from "@/context/Chat/ChatContext";
import { useAppContext } from "@/context/App/AppContext";
import { useSocketContext } from "@/context/Socket/SocketContext";
import * as actions from "@/context/Chat/action";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields, sendTyping, stopTyping } from "@/utils";
import useToast from "../common/useToast";

const useSendMessage = () => {
  const toastId = "send_message";
  const { showToast } = useToast();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typingTimeoutRef = useRef(null);

  const { state, dispatch } = useChatContext();
  const { activeUser } = useAppContext().state;
  const { activeChatRoom } = state;
  const socket = useSocketContext();

  const clearInput = () => {
    setMessage("");
  };

  const handleMessageChange = (e) => {
    const newMsg = e?.target?.value;
    setMessage(newMsg);

    if (socket && activeChatRoom?.id && activeUser?.id) {
      sendTyping(socket, activeChatRoom.id, activeUser.id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (socket && activeChatRoom?.id && activeUser?.id) {
        stopTyping(socket, activeChatRoom.id, activeUser.id);
      }
    }, 2000);
  };

  const sendMessage = async (chatRoom) => {
    const msgToSend = message.trim();

    if (!msgToSend || !chatRoom?.id) return;

    clearInput();

    if (socket && chatRoom.id && activeUser?.id) {
      stopTyping(socket, chatRoom.id, activeUser.id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    dispatch({
      type: actions.ADD_MESSSAGE_IN_CHAT_MESSAGES,
      payload: { chatRoomId: chatRoom.id, data: msgToSend, activeUser },
    });

    setLoading(true);
    setError(null);

    try {
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/send-message`,
        method: "POST",
        body: {
          chatRoomId: chatRoom.id,
          content: msgToSend,
        },
      });

      if (res.error) {
        throw new Error(res.error);
      }

      const formatted = convertIdFields(res?.data?.data);

      dispatch({
        type: actions.UPDATE_LAST_MESSAGE,
        payload: {
          message: formatted,
          activeUserId: activeUser?.id,
          chatRoomId: chatRoom.id,
        },
      });
    } catch (err) {
      setError(err.message);
      showToast({
        toastId,
        type: "error",
        message: "Failed to send message. Please refresh the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, chatRoom) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(chatRoom);
    }
  };

  return {
    loadingMessageSend: loading,
    errorMessageSend: error,
    message,
    setMessage,
    handleMessageChange,
    handleKeyDown,
    sendMessage,
    clearInput,
  };
};

export default useSendMessage;
