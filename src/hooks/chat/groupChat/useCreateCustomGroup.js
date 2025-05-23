import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const { default: useToast } = require("@/hooks/common/useToast");
const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");
import * as actions from '@/context/Chat/action';
import { convertIdFields } from "@/utils";
import { useChatContext } from "@/context/Chat/ChatContext";
const useCreateCustomGroup = () => {
    const toastId = "create_custom_group";
    const {showToast} = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {activeProject} = useProjectsContext().state;
  const {dispatch} = useChatContext();
  const createCustomGroup = async (participantIds,name) => {
    setLoading(true);
    setError(null);
     dispatch({type:actions.SET_GROUP_MESSAGES_REQUEST});
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-custom-group-chat`,
      method: "POST",
      body: {
        boardId:activeProject?.id,
        participantIds,
        name,
      },
    });

    if(res.error){
        setLoading(false);
        setError(res.error);
        showToast({toastId,type:"error",message: res.error?.message || "Failed to create custom group. Please try again"})
        return;
    }
    const convertedIdResponse = convertIdFields(res?.data?.chatRoom || {});
    dispatch({type:actions.SET_CHAT_ROOM,payload:convertedIdResponse});
    dispatch({type:actions.ADD_NEW_GROUP_IN_GROUPS,payload:convertedIdResponse})
    setLoading(false);
    return convertedIdResponse;
  };

  return {loadingCreateCustomGroup:loading,errorCreateCustomGroup:error,createCustomGroup};
};
export default useCreateCustomGroup;
