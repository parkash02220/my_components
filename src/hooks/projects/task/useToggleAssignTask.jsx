import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useToggleAssignTask = () => {
  const {showToast} = useToast();
  const { dispatch } = useAppContext();
  const [loadingAssignTaskIds, setLoadingAssignTaskIds] = useState([]);
  const [errorAssignTask, setErrorAssignTask] = useState(false);
  const toggleAssignTask = async (taskId, assignedUserIds, userId) => {
    setLoadingAssignTaskIds((pre) => [...pre, userId]);
    setErrorAssignTask(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
      method: "PUT",
      body: {
        assigned_to: assignedUserIds,
      },
    });

    setLoadingAssignTaskIds((pre) => pre?.filter((id) => id !== userId));

    if (res.error) {
      showToast({type:"error",message:"Request failed."})
      console.log("::error while changing state of assign task", res);
      setErrorAssignTask(true);
      return;
    }
    const formattedIdResponse = convertIdFields(res?.data?.updatedTask || {});
    console.log("::res in toggle assign task",formattedIdResponse)
    dispatch({
      type: "EDIT_TASK",
      payload: formattedIdResponse,
    });
    showToast({type:"success",message:"Request successfull."})
  };
  return { loadingAssignTaskIds, errorAssignTask, toggleAssignTask };
};

export default useToggleAssignTask;
