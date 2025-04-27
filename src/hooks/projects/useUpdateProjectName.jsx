import { useEffect, useRef, useState } from "react";
import useDebounce from "../common/useDebounce";
import { ApiCall } from "@/utils/ApiCall";
import useProjectNameAvailability from "./useProjectNameAvailability";
import { useAppContext } from "@/context/AppContext";

const useUpdateProjectName = (
  initialName = "",
  setShowProjectNameTextfield
) => {
  const { dispatch } = useAppContext();
  const [loadingUpdateProjectName, setLoadingUpdateProjectName] =
    useState(false);
  const [errorUpdateProjectName, setErrorUpdateProjectName] = useState(false);
  const [helperTextUpdateProjectName, setHelperTextUpdateProjectName] =
    useState("");
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

    setLoadingUpdateProjectName(true);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/check-boardName-duplicates`,
      method: "POST",
      body: { name: projectName },
      signal: controller.signal,
    });

    if (res.error) {
      setErrorUpdateProjectName(true);
      setIsNameAvailable(false);
      setLoadingUpdateProjectName(false);
      setHelperTextUpdateProjectName(res?.error?.message);
      return;
    }
    setErrorUpdateProjectName(false);
    setHelperTextUpdateProjectName("");
    setIsNameAvailable(res.data?.createName || false);
    setLoadingUpdateProjectName(false);
  };

  const startEditing = (currentName) => {
    setOriginalProjectName(currentName);
    setProjectName(currentName);
  };

  const cancelEditing = () => {
    setProjectName(originalProjectName);
    setErrorUpdateProjectName(false);
    setHelperTextUpdateProjectName(false);
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
    setErrorUpdateProjectName(error);
    setHelperTextUpdateProjectName(message);
  };

  const handleProjectInputKeyDown = (e, projectId) => {
    if (e.key === "Enter") {
      if (isNameAvailable) {
        handleUpdateProjectName(projectId);
      }
    } else if (e.key === "Esc") {
      cancelEditing();
    }
  };

  const handleUpdateProjectName = async (projectId) => {
    const trimmedProjectName = projectName?.trim();
    if (
      !trimmedProjectName ||
      trimmedProjectName === originalProjectName ||
      errorUpdateProjectName
    )
      return;

    setLoadingUpdateProjectName(true);
    setErrorUpdateProjectName(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/rename-board/${projectId}`,
      method: "PATCH",
      body: {
        newName: trimmedProjectName,
      },
    });

    setLoadingUpdateProjectName(false);
    if (res.error) {
      console.log("::error while changing project name", res);
      setErrorUpdateProjectName(true);
      return;
    }

    setOriginalProjectName(trimmedProjectName);
    setProjectName(trimmedProjectName);
    setShowProjectNameTextfield(false);
    dispatch({
      type: "UPDATE_PROJECT_NAME",
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
      errorUpdateProjectName
    )
      return;

    checkAvailability(debouncedProjectName);
  }, [debouncedProjectName]);

  return {
    loadingUpdateProjectName,
    errorUpdateProjectName,
    helperTextUpdateProjectName,
    startEditing,
    cancelEditing,
    handleProjectInputChange,
    handleUpdateProjectName,
    handleProjectInputKeyDown,
    projectName,
  };
};

export default useUpdateProjectName;
