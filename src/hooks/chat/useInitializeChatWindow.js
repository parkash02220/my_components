const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect, useRef } = require("react");
const { default: useToast } = require("../common/useToast");
import { useAppContext } from "@/context/App/AppContext";
import * as actions from "@/context/Chat/action";
import { useChatContext } from "@/context/Chat/ChatContext";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { convertIdFields } from "@/utils";
import { useRouter } from "next/navigation";
const useInitializeChatWindow = () => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const { showToast } = useToast();
  const { dispatch } = useChatContext();
  const {activeProject} = useProjectsContext()?.state;
  const projectId = activeProject?.id;
  const {activeUser} = useAppContext()?.state;
  const [isCHatWindowAvailable,setIsCHatWindowAvailable] = useState(false);
  const initialFetchDone = useRef(false);
  const router = useRouter();
  const initializeChatWindow = async () => {
    if(loading) return;
    setLoading(true);
    setError(null);
    setIsCHatWindowAvailable(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-chat-room/${projectId}`,
      method: "POST",
    });
    if (res.error) {
      setLoading(false);
        setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: res?.error?.message || "Something went wrong while getting chat window.",
      });
      router.push(`projects/${projectId}`);
      setIsCHatWindowAvailable(false);
      return false;
    }
    setIsCHatWindowAvailable(true);
    setLoading(false);
    return true;
  };

  useEffect(() => {
    if (!projectId || initialFetchDone.current) return;
    initializeChatWindow(projectId);
    initialFetchDone.current = true;
  }, [projectId]);

  return { initializeChatWindow,isCHatWindowAvailable};
};
export default useInitializeChatWindow;
