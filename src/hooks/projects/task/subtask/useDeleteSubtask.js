import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from "@/context/Task/action";
import { useTaskContext } from "@/context/Task/TaskContext";

const useDeleteSubtask = () => {
  const toastId = "delete_subtask";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, state } = useTaskContext();
  const { activeTask } = state;
  const deleteSubTask = async (subTaskId) => {
    showToast({ toastId, type: "loading", message: "Deleting subtask..." });
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-subtask/${activeTask?.id}/${subTaskId}`,
      method: "DELETE",
    });

    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: res.error?.message || "Error while deleting subtask.",
      });
      return;
    }
    setLoading(false);
    showToast({
      toastId,
      type: "success",
      message: res?.data?.message || "Subtask deleted successfully.",
    });
    dispatch({ type: actions.DELETE_SUBTASK, payload: subTaskId });
  };
  return { loading, error, deleteSubTask };
};
export default useDeleteSubtask;
