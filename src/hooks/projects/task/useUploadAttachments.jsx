import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState, useCallback } from "react";
import * as taskActions from "@/context/Task/action";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useTaskContext } from "@/context/Task/TaskContext";
const useUploadAttachments = () => {
  const toastId = "upload_image";
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const [loadingUploadAttachments, setLoadingUploadAttachments] =
    useState(false);
  const [progressUploadAttachments, setProgressUploadAttachments] = useState(0);
  const [errorUploadAttachments, setErrorUploadAttachments] = useState(null);
  const [successUploadAttachments, setSuccessUploadAttachments] =
    useState(false);

  const uploadImage = useCallback(async (files, taskId, columnId) => {
    setProgressUploadAttachments(0);
    setErrorUploadAttachments(null);
    setSuccessUploadAttachments(false);
    setLoadingUploadAttachments(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/upload-task-image/${taskId}`,
      method: "POST",
      onUploadProgress: (event) => {
        const percentage = Math.round((event.loaded * 100) / event.total);
        setProgressUploadAttachments(percentage);
      },
      body: formData,
    });

    setLoadingUploadAttachments(false);

    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to upload image. Please try again.",
      });
      setErrorUploadAttachments(true);
      return;
    }

    setSuccessUploadAttachments(true);
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
      message: "Image uploaded successfully.",
    });
  }, []);

  return {
    uploadImage,
    progressUploadAttachments,
    errorUploadAttachments,
    successUploadAttachments,
    loadingUploadAttachments,
  };
};
export default useUploadAttachments;
