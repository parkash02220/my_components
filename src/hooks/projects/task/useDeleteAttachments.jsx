import useToast from "@/hooks/common/useToast";
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useDeleteAttachments = () => {
  const toastId = "delete_image";
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteAttachment = async (image, taskId, columnId) => {
    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-task-image/${taskId}`,
      method: "DELETE",
      body: {
        imagePath: image,
      },
    });

    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({
        toastId,
        type: "error",
        message: "Failed to delete image. Please try again.",
      });
      return;
    }
    setLoading(false);
    const images = res?.data?.images;
    taskDispatch({
      type: taskActions.ADD_IMAGE_TO_TASK,
      payload: { images },
    });
    projectsDispatch({
      type: projectsActions.ADD_IMAGE_TO_TASK_IN_PROJECT,
      payload: { images, taskId, columnId },
    });
    showToast({
      toastId,
      type: "success",
      message: "Image deleted successfully.",
    });
  };
  return {
    loadingDeleteAttachment: loading,
    errorDeleteAttachment: error,
    deleteAttachment,
  };
};
export default useDeleteAttachments;
