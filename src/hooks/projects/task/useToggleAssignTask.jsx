import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import toast from "react-hot-toast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useToggleAssignTask = () => {
  const { showToast } = useToast();
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
      console.log("::error while changing state of assign task", res);
      setErrorAssignTask(true);
      return;
    }

    showToast({ type: "success", message: "Success !" });

    dispatch({
      type: "UPDATE_ASSIGNED_USERS_IN_TASK",
      payload: assignedUserIds,
    });
  };
  return { loadingAssignTaskIds, errorAssignTask, toggleAssignTask };
};

export default useToggleAssignTask;
