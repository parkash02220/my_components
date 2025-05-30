const { useChatContext } = require("@/context/Chat/ChatContext");
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect, useRef } = require("react");
const { default: useToast } = require("../common/useToast");
import { useAppContext } from "@/context/App/AppContext";
import * as actions from "@/context/Chat/action";
import { useSocketContext } from "@/context/Socket/SocketContext";
import { sendTyping, stopTyping } from "@/utils";

const useSendMessage = () => {
  const toastId = "send_message";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { state, dispatch } = useChatContext();
  const { activeUser } = useAppContext().state;
  const { activeChatRoom } = state;
  const content = useRef("");
  const typingTimeoutRef = useRef(null);
  const socket = useSocketContext();
  const handleMessageChange = (e) => {
    sendTyping();
    const newMessage = e?.target?.value;
    content.current = newMessage;
    setMessage(newMessage);

    if (socket && activeChatRoom?.id && activeUser?.id) {
      sendTyping(socket,activeChatRoom.id, activeUser.id);
    }
  
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  
    typingTimeoutRef.current = setTimeout(() => {
      if (socket && activeChatRoom?.id && activeUser?.id) {
        stopTyping(socket,activeChatRoom.id, activeUser.id);
      }
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async (chatRoom) => {
    const msgToSend = content.current;
    if (!msgToSend?.trim() || !chatRoom?.id) return;

  if (socket && chatRoom?.id && activeUser?.id) {
    stopTyping(socket, chatRoom.id, activeUser.id);
  }

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = null;
  }


    setMessage("");
    dispatch({type:actions.ADD_MESSSAGE_IN_CHAT_MESSAGES,payload:{chatRoomId:chatRoom?.id,data:msgToSend,activeUser}});
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/send-message`,
      method: "POST",
      body: {
        chatRoomId: chatRoom?.id,
        content: msgToSend,
      },
    });
    content.current = "";
    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: "Failed to send message. Please refresh the page.",
      });
      return;
    }

    setLoading(false);
  };

  return {
    loadingMessageSend: loading,
    errorMessageSend: error,
    sendMessage,
    handleMessageChange,
    message,
    handleKeyDown,
    setMessage,
  };
};

export default useSendMessage;
