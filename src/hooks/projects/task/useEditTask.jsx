import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useRef, useState } from "react";
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
const useEditTask = () => {
  const toastId = "edit_task";
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const controllerRef = useRef(new AbortController());

  const updateTaskInBackend = async (formData, taskId) => {
    controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
      method: "PUT",
      body: formData,
      signal: controller.signal,
    });
    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({
        toastId,
        type: "error",
        message: "Failed to update the task. Please refresh the page.",
      });
      console.log("::error while editing task", true);
      return;
    }
    setLoading(false);
    const formattedIdResponse = convertIdFields(res?.data?.updatedTask || {});
    projectsDispatch({
      type: projectsActions.EDIT_TASK_IN_PROJECT,
      payload: { ...formattedIdResponse },
    });
    taskDispatch({
      type: taskActions.EDIT_TASK,
      payload: { ...formattedIdResponse },
    });

    showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
  };
  return {
    loadingEditTask: loading,
    errorEditTask: error,
    updateTaskInBackend,
  };
};
export default useEditTask;
