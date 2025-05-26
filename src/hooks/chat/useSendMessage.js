const { useChatContext } = require("@/context/Chat/ChatContext");
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect, useRef } = require("react");
const { default: useToast } = require("../common/useToast");
import { useAppContext } from "@/context/App/AppContext";
import * as actions from "@/context/Chat/action";

const useSendMessage = () => {
  const toastId = "send_message";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { state, dispatch } = useChatContext();
  const { activeUser } = useAppContext().state;
  const { chatRoom } = state;
  const content = useRef("");
  const handleMessageChange = (e) => {
    const newMessage = e?.target?.value;
    content.current = newMessage;
    setMessage(newMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async (isGroupChat, chatRoomOverRide) => {
    const msgToSend = content.current;
    const currentChatRoom = chatRoomOverRide || chatRoom;
    if (!msgToSend?.trim() || !currentChatRoom?.id) return;
    setMessage("");
    if (isGroupChat) {
      dispatch({
        type: actions.ADD_MESSSAGE_IN_GROUP_MESSAGES,
        payload: { data: msgToSend, activeUser },
      });
    } else {
      dispatch({
        type: actions.ADD_MESSSAGE_IN_USER_MESSAGES,
        payload: { data: msgToSend, activeUser },
      });
    }
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/send-message`,
      method: "POST",
      body: {
        chatRoomId: currentChatRoom?.id,
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
