import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import * as actions from "@/context/Task/action";
import { useTaskContext } from "@/context/Task/TaskContext";
const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useCreateSubTask = () => {
  const toastId = "create_subtask";
  const { showToast } = useToast();
  const { dispatch } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const addSubTaskToBackend = async (taskId, title) => {
    if (loading) return;
    setLoading(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/add-subtask/${taskId}`,
      method: "POST",
      body: { title },
    });

    if (res.error) {
      setLoading(false);
      showToast({
        toastId,
        type: "error",
        message: "Failed to create subtask. Please try again.",
      });
      return;
    }
    setLoading(false);
    const formattedIdResponse = convertIdFields(res?.data?.subtask || {});

    dispatch({ type: actions.ADD_SUBTASK, payload: formattedIdResponse });
    showToast({
      toastId,
      type: "success",
      message: "Subtask created successfully.",
    });
  };

  return { loadingCreateSubTask: loading, addSubTaskToBackend };
};

export default useCreateSubTask;
