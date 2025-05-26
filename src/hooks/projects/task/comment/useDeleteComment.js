import { useTaskContext } from "@/context/Task/TaskContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteComment = () => {
  const toastId = "delete_comment";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useTaskContext();
  const { activeTask } = state;
  const deleteTaskComment = async (commentId) => {
    showToast({ toastId, type: "loading", message: "Deleting comment..." });
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-comment/${activeTask?.id}/${commentId}`,
      method: "DELETE",
    });

    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: res.error?.message || "Error while deleting comment.",
      });
      return;
    }
    setLoading(false);
    showToast({
      toastId,
      type: "success",
      message: res?.data?.message || "Comment deleted successfully.",
    });
  };
  return { loading, error, deleteTaskComment };
};
export default useDeleteComment;
