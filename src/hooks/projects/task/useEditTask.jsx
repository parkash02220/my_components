import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useRef, useState } from "react";

const useEditTask = () => {
  const toastId = "edit_task";
  const { showToast } = useToast();
  const { dispatch } = useAppContext();
  const [loadingEditTask, setLoadingEditTask] = useState(false);
  const [errorEditTask, setErrorEditTask] = useState(false);
  const controllerRef = useRef(new AbortController());

  const updateTaskInBackend = async (formData, taskId) => {
    console.log("::formadata", formData);
    controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoadingEditTask(true);
    setErrorEditTask(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
      method: "PUT",
      body: formData,
      signal: controller.signal,
    });
    setLoadingEditTask(false);
    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to update the task. Please refresh the page.",
      });
      console.log("::error while editing task", true);
      setErrorEditTask(true);
      return;
    }

    const formattedIdResponse = convertIdFields(res?.data?.updatedTask || {});
    console.log("::res in formdata", formattedIdResponse);
    dispatch({ type: "EDIT_TASK", payload: { ...formattedIdResponse } });
    showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
  };
  return { loadingEditTask, errorEditTask, updateTaskInBackend };
};
export default useEditTask;
