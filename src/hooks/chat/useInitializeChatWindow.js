const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect, useRef } = require("react");
const { default: useToast } = require("../common/useToast");
import * as actions from "@/context/Chat/action";
import { useChatContext } from "@/context/Chat/ChatContext";
import { convertIdFields } from "@/utils";
const useInitializeChatWindow = (projectId) => {
  const { showToast } = useToast();
  const hasInitialized = useRef({});
  const { dispatch } = useChatContext();
  const initializeChatWindow = async (projectId) => {
    dispatch({ type: actions.INITIALIZE_CHAT_WINDOW_REQUEST });
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-chat-room/${projectId}`,
      method: "POST",
    });
    if (res.error) {
      dispatch({
        type: actions.INITIALIZE_CHAT_WINDOW_ERROR,
        payload: res.error,
      });
      showToast({
        toastId,
        type: "error",
        message: res?.error?.message || "Something went wrong.",
      });
      return;
    }

    const formattedIdResponse = convertIdFields(res?.data || {});

    dispatch({
      type: actions.INITIALIZE_CHAT_WINDOW_SUCCESS,
      payload: formattedIdResponse,
    });
  };

  useEffect(() => {
    if (!projectId || hasInitialized.current[projectId]) return;

    hasInitialized.current[projectId] = true;
    initializeChatWindow(projectId);
  }, [projectId]);

  return { initializeChatWindow,};
};
export default useInitializeChatWindow;
