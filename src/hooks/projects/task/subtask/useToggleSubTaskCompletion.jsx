import { useTaskContext } from "@/context/Task/TaskContext";
import useToast from "@/hooks/common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useToggleSubTaskCompletion = () => {
  const { state } = useTaskContext();
  const { activeTask } = state || {};
  const toastId = "toggle_subtask";
  const { showToast } = useToast();
  const [loadingIdsToggle, setLoadingIdsToggle] = useState([]);
  const [subtasks, setSubtasks] = useState(activeTask?.subtasks || []);

  const toggleCompletionSubTask = async (subTaskId, currentStatus) => {
    setLoadingIdsToggle((pre) => [...pre, subTaskId]);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/toggle-subtask-completion/${activeTask?.id}/${subTaskId}`,
      method: "PATCH",
    });

    setLoadingIdsToggle((pre) => pre.filter((id) => id !== subTaskId));

    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to mark subtask completion. Please try again.",
      });
      console.log("::error while toggling the completion state", res);
      return;
    }

    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === subTaskId
          ? { ...subtask, completed: !currentStatus }
          : subtask
      )
    );

    showToast({
      toastId,
      type: "success",
      message: "Completion marked successfully.",
    });
  };

  useEffect(() => {
    setSubtasks(activeTask?.subtasks || []);
  }, [activeTask]);

  return { loadingIdsToggle, subtasks, toggleCompletionSubTask };
};
export default useToggleSubTaskCompletion;
