import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
const useDeleteTask = () => {
  const toastId = "delete_task";
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteTaskFromBackend = async (taskId, columnId) => {
    setError(false);
    setLoading(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-task/${taskId}`,
      method: "DELETE",
    });
    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({
        toastId,
        type: "error",
        message: "Failed to delete task.Please try again.",
      });
      console.log("::error while deleting the task", res);
      return;
    }
    setLoading(false);
    projectsDispatch({
      type: projectsActions.DELETE_TASK_IN_PROJECT,
      payload: { taskId, columnId },
    });
    taskDispatch({ type: taskActions.DELETE_ACTIVE_TASK });
    showToast({
      toastId,
      type: "success",
      message: "Task deleted successfully.",
    });
  };
  return {
    loadingDeleteTask: loading,
    errorDeleteTask: error,
    deleteTaskFromBackend,
  };
};
export default useDeleteTask;
