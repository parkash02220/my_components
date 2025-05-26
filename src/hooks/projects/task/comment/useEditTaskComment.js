import { useTaskContext } from "@/context/Task/TaskContext";
import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useEditTaskComment = () => {
  const toastId = "edit_task_comment";
  const { showToast } = useToast();
  const { activeTask } = useTaskContext()?.state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editTaskComment = async (commentId, newText) => {
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/update-subcomment/${activeTask?.id}/${commentId}`,
      method: "POST",
      body: {
        text: newText,
      },
    });
    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: res.error?.message || "Failed to update comment.",
      });
      return false;
    }

    setLoading(false);
    const convertedIdResponse = convertIdFields(res?.data?.comments || []);
    return convertedIdResponse;
  };

  return { loading, error, editTaskComment };
};

export default useEditTaskComment;
