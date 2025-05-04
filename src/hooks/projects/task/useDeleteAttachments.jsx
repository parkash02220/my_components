import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useDeleteAttachments = () => {
  const toastId = "delete_image";
  const { showToast } = useToast();
  const { dispatch } = useAppContext();
  const [loadingDeleteAttachment, setLoadingDeleteAttachment] = useState(false);
  const [errorDeleteAttachment, setErrorDeleteAttachment] = useState(false);

  const deleteAttachment = async (image, taskId, columnId) => {
    setLoadingDeleteAttachment(true);
    setErrorDeleteAttachment(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-task-image/${taskId}`,
      method: "DELETE",
      body: {
        imagePath: image,
      },
    });

    setLoadingDeleteAttachment(false);
    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to delete image. Please try again.",
      });
      console.log("::error while deleting the image", res);
      setErrorDeleteAttachment(true);
      return;
    }

    const images = res?.data?.images;
    dispatch({
      type: "ADD_IMAGE_TO_TASK",
      payload: { images, taskId, columnId },
    });
    showToast({
      toastId,
      type: "success",
      message: "Image deleted successfully.",
    });
  };
  return { loadingDeleteAttachment, errorDeleteAttachment, deleteAttachment };
};
export default useDeleteAttachments;
