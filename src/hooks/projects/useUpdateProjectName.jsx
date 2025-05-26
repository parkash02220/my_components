import { useEffect, useRef, useState } from "react";
import useDebounce from "../common/useDebounce";
import { ApiCall } from "@/utils/ApiCall";
import useToast from "../common/useToast";
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useUpdateProjectName = (
  initialName = "",
  setShowProjectNameTextfield
) => {
  const toastId = "update_project_name";
  const { showToast } = useToast();
  const { dispatch } = useProjectsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [originalProjectName, setOriginalProjectName] = useState();
  const [projectName, setProjectName] = useState();
  const debouncedProjectName = useDebounce(projectName);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [hasMount, setHasMount] = useState(false);
  const abortControllerRef = useRef(null);
  const checkAvailability = async (projectName) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/check-boardName-duplicates`,
      method: "POST",
      body: { name: projectName },
      signal: controller.signal,
    });

    if (res.error) {
      setError(true);
      setIsNameAvailable(false);
      setLoading(false);
      setHelperText(res?.error?.message);
      return;
    }
    setError(false);
    setHelperText("");
    setIsNameAvailable(res.data?.createName || false);
    setLoading(false);
  };

  const startEditing = (currentName) => {
    setOriginalProjectName(currentName);
    setProjectName(currentName);
  };

  const cancelEditing = () => {
    setProjectName(originalProjectName);
    setError(false);
    setHelperText(false);
  };

  const handleProjectInputChange = (e) => {
    setHasMount(true);
    let error = false;
    let message = "";
    const name = e.target.value || "";
    const newProjectName = name?.trim();
    if (!newProjectName) {
      error = true;
      message = "Project name can not be empty";
    } else if (newProjectName?.length < 3 || newProjectName?.length > 50) {
      error = true;
      message = "Project name must be between 3-50 characters";
    }

    setProjectName(name);
    setError(error);
    setHelperText(message);
  };

  const handleProjectInputKeyDown = (e, projectId) => {
    if (e.key === "Enter") {
      if (isNameAvailable) {
        handleUpdateProjectName(projectId);
      }
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const handleUpdateProjectName = async (projectId) => {
    if (loading) return;
    const trimmedProjectName = projectName?.trim();
    if (
      !trimmedProjectName ||
      trimmedProjectName === originalProjectName ||
      error
    )
      return;

    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/rename-board/${projectId}`,
      method: "PATCH",
      body: {
        newName: trimmedProjectName,
      },
    });

    if (res.error) {
      setLoading(false);
      setError(true);
      showToast({
        toastId,
        type: "error",
        message: "Failed to update project name. Please try again.",
      });
      console.log("::error while changing project name", res);
      return;
    }
    setLoading(false);
    setOriginalProjectName(trimmedProjectName);
    setProjectName(trimmedProjectName);
    setShowProjectNameTextfield(false);
    dispatch({
      type: actions.UPDATE_PROJECT_NAME,
      payload: { newName: trimmedProjectName, projectId },
    });
  };

  useEffect(() => {
    if (!initialName) return;
    setProjectName(initialName);
  }, [initialName]);

  useEffect(() => {
    if (
      !hasMount ||
      !debouncedProjectName ||
      debouncedProjectName === originalProjectName ||
      error
    )
      return;

    checkAvailability(debouncedProjectName);
  }, [debouncedProjectName]);

  return {
    loadingUpdateProjectName: loading,
    errorUpdateProjectName: error,
    helperTextUpdateProjectName: helperText,
    startEditing,
    cancelEditing,
    handleProjectInputChange,
    handleUpdateProjectName,
    handleProjectInputKeyDown,
    projectName,
  };
};

export default useUpdateProjectName;
