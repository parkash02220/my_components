import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteTask = () => {
  const toastId = "delete_task";
  const { showToast } = useToast();
  const { dispatch } = useAppContext();
  const [loadingDeleteTask, setLoadingDeleteTask] = useState(false);
  const [errorDeleteTask, setErrorDeleteTask] = useState(false);
  const deleteTaskFromBackend = async (taskId, columnId) => {
    setErrorDeleteTask(false);
    setLoadingDeleteTask(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-task/${taskId}`,
      method: "DELETE",
    });
    setLoadingDeleteTask(false);
    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to delete task.Please try again.",
      });
      console.log("::error while deleting the task", res);
      setErrorDeleteTask(true);
      return;
    }
    dispatch({ type: "DELETE_TASK", payload: { taskId, columnId } });
    showToast({
      toastId,
      type: "success",
      message: "Task deleted successfully.",
    });
  };
  return { loadingDeleteTask, errorDeleteTask, deleteTaskFromBackend };
};
export default useDeleteTask;
