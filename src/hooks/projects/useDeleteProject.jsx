import useToast from "../common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useDeleteProject = () => {
  const toastId = "delete_project";
  const { showToast } = useToast();
  const { dispatch } = useProjectsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteProject = async (projectId) => {
    showToast({
      toastId,
      type: "loading",
      message: "Deleting your project...",
    });
    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-board/${projectId}`,
      method: "DELETE",
    });

    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({
        toastId,
        type: "error",
        message: "Failed to delete project. Please try again.",
      });
      return;
    }
    setLoading(false);
    showToast({
      toastId,
      type: "success",
      message: "Project deleted successfully.",
    });
    dispatch({ type: actions.DELETE_ACTIVE_PROJECT, payload: { projectId } });
  };
  return {
    loadingDeleteProject: loading,
    errorDeleteProject: error,
    deleteProject,
  };
};

export default useDeleteProject;
