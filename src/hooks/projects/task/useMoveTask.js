import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useMoveTask = () => {
  const toastId = "move_task";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useProjectsContext();

  const moveTask = async (taskId, toSectionId, newPosition) => {
    let foundSectionId = null;
    let foundIndex = null;

    state.activeProject?.sections?.forEach((section) => {
      const idx = section.tasks.findIndex((task) => task.id === taskId);
      if (idx !== -1) {
        foundSectionId = section.id;
        foundIndex = idx + 1;
      }
    });

    if (foundSectionId && foundIndex !== null) {
      if (foundSectionId === toSectionId && foundIndex === newPosition) {
        showToast({
          toastId,
          type: "info",
          message: "Task is already in this position.",
        });
        return;
      }
    }

    setLoading(true);

    dispatch({
      type: actions.MOVE_TASK,
      payload: { taskId, toSectionId, newPosition: newPosition - 1 },
    });

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/move-task`,
      method: "POST",
      body: { taskId, toSectionId, newPosition },
    });

    if (res.error) {
      setLoading(false);
      showToast({
        toastId,
        type: "error",
        message: "Failed to move the task. Please refresh the page.",
      });
      return;
    }

    setLoading(false);
    showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
  };

  return { loadingMoveTask: loading, moveTask };
};

export default useMoveTask;
