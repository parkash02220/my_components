import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as projectsActions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useAddUserInChatroom from "../chat/useAddUserInChatroom";
import useRemoveUserInChatroom from "../chat/useRemoveUserInChatroom";
const useToggleAssignProject = () => {
  const {addUserInChatRoom} = useAddUserInChatroom();
  const {removeUserInChatRoom} = useRemoveUserInChatroom();
  const toastId = "add_user_in_project";
  const { showToast } = useToast();
  const { dispatch: projectsDispatch } = useProjectsContext();
  const [loadingAssignProjectIds, setLoadingAssignProjectIds] = useState([]);
  const [errorAssignProject, setErrorAssignProject] = useState(false);
  const toggleAssignProject = async (projectId, userId, type = "") => {
    projectsDispatch({
      type: projectsActions.EDIT_USERS_IN_PROJECT,
      payload: { type, userId },
    });
    setLoadingAssignProjectIds((pre) => [...pre, userId]);
    setErrorAssignProject(false);
    const url =
      type === "add_user"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/add-user-to-board/${projectId}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/delete-user-to-board/${projectId}`;
    const body =
      type === "add_user"
        ? {
            userIds: [userId],
          }
        : { userId };
    const res = await ApiCall({
      url,
      method: type === "add_user" ? "POST" : "DELETE",
      body,
    });

    setLoadingAssignProjectIds((pre) => pre?.filter((id) => id !== userId));

    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Request failed. Please refresh the page",
      });
      setErrorAssignProject(true);
      return;
    }
    const formattedIdResponse = convertIdFields(res?.data?.board || {});
    if(type==="add_user"){
     await addUserInChatRoom(null,userId);
    }else{
     await removeUserInChatRoom(null,userId);
    }
    showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
  };
  return { loadingAssignProjectIds, errorAssignProject, toggleAssignProject };
};

export default useToggleAssignProject;
