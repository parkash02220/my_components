import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
const useToggleAssignTask = () => {
  const toastId = 'assign_task';
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loadingAssignTaskIds, setLoadingAssignTaskIds] = useState([]);
  const [errorAssignTask, setErrorAssignTask] = useState(false);
  const toggleAssignTask = async (taskId, assignedUserIds, userId) => {
    setLoadingAssignTaskIds((pre) => [...pre, userId]);
    setErrorAssignTask(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
      method: "PUT",
      body: {
        assigned_to: assignedUserIds,
      },
    });

    setLoadingAssignTaskIds((pre) => pre?.filter((id) => id !== userId));

    if (res.error) {
      showToast({ toastId,type: "error", message: "Request failed." });
      setErrorAssignTask(true);
      return;
    }
    const formattedIdResponse = convertIdFields(res?.data?.updatedTask || {});
    projectsDispatch({
      type: projectsActions.EDIT_TASK_IN_PROJECT,
      payload: formattedIdResponse,
    });
    taskDispatch({
      type: taskActions.EDIT_TASK,
      payload: formattedIdResponse,
    });
    showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
  };
  return { loadingAssignTaskIds, errorAssignTask, toggleAssignTask };
};

export default useToggleAssignTask;
