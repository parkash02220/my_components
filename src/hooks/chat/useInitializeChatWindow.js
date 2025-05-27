const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect, useRef } = require("react");
const { default: useToast } = require("../common/useToast");
import { useAppContext } from "@/context/App/AppContext";
import * as actions from "@/context/Chat/action";
import { useChatContext } from "@/context/Chat/ChatContext";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { convertIdFields } from "@/utils";
const useInitializeChatWindow = () => {
  const { showToast } = useToast();
  const { dispatch } = useChatContext();
  const {activeProject} = useProjectsContext()?.state;
  const projectId = activeProject?.id;
  const {activeUser} = useAppContext()?.state;
  const initializeChatWindow = async () => {
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
      payload: {data:formattedIdResponse,activeUserId:activeUser?.id},
    });
  };

  useEffect(() => {
    if (!projectId) return;
    initializeChatWindow(projectId);
  }, [projectId]);

  return { initializeChatWindow,};
};
export default useInitializeChatWindow;
