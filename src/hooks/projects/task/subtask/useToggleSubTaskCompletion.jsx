import useToast from "@/hooks/common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useToggleSubTaskCompletion = (acitveTask) => {
  const toastId = "toggle_subtask";
  const { showToast } = useToast();
  const [loadingIdsToggle, setLoadingIdsToggle] = useState([]);
  const [subtasks, setSubtasks] = useState(acitveTask?.subtasks || []);

  const toggleCompletionSubTask = async (taskId, subTaskId, currentStatus) => {
    setLoadingIdsToggle((pre) => [...pre, subTaskId]);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/toggle-subtask-completion/${taskId}/${subTaskId}`,
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
    setSubtasks(acitveTask?.subtasks || []);
  }, [acitveTask]);

  return { loadingIdsToggle, subtasks, toggleCompletionSubTask };
};
export default useToggleSubTaskCompletion;
