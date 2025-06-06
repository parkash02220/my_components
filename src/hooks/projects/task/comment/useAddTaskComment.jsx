import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
import useToast from "@/hooks/common/useToast";
const useAddTaskComment = () => {
  const toastId = "add_comment_to_task";
  const {showToast} = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const addCommentToTask = async (taskId, comment, columnId) => {
    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/add-task-comment/${taskId}`,
      method: "POST",
      body: {
        text: comment,
      },
    });

    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({toastId,type:"error",message:res?.error?.message || "Failed to add comment to task."});
      return;
    }
    setLoading(false);
    const formattedIdResponse = convertIdFields(res?.data?.comments);
    projectsDispatch({
      type: projectsActions.ADD_COMMENTS_TO_TASK_IN_PROJECT,
      payload: { subComments: formattedIdResponse, taskId, columnId },
    });
    taskDispatch({
      type: taskActions.ADD_COMMENTS_TO_TASK,
      payload: { subComments: formattedIdResponse, taskId, columnId },
    });
    return formattedIdResponse || [];
  };
  return {
    loadingAddCommnet: loading,
    errorAddComment: error,
    addCommentToTask,
  };
};

export default useAddTaskComment;
