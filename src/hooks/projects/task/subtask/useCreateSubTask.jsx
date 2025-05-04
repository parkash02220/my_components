import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useCreateSubTask = () => {
  const toastId = "create_subtask";
  const { showToast } = useToast();
  const { dispatch } = useAppContext();
  const [loadingCreateSubTask, setLoadingCreateSubTask] = useState(false);
  const addSubTaskToBackend = async (taskId, title) => {
    setLoadingCreateSubTask(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/add-subtask/${taskId}`,
      method: "POST",
      body: { title },
    });
    setLoadingCreateSubTask(false);
    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to create subtask. Please try again.",
      });
      console.log("::error while adding subtask", res);
      return;
    }

    const formattedIdResponse = convertIdFields(res?.data?.subtask || {});

    dispatch({ type: "ADD_SUBTASK", payload: formattedIdResponse });
    showToast({
      toastId,
      type: "success",
      message: "Subtask created successfully.",
    });
  };

  return { loadingCreateSubTask, addSubTaskToBackend };
};

export default useCreateSubTask;
