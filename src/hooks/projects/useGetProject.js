
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useState } from "react";
import useToast from "../common/useToast";
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useGetProject = (id) => {
  const toastId = "get_project";
  const {showToast} = useToast(); 
  const { dispatch,state } = useProjectsContext();
  const { activeProject, loadingActiveProject,errorActiveProject, projectVersion } = state;
  const [isNotFound,setIsNotFound] = useState(false);
  const getProjectById = async (id) => {
    setIsNotFound(false);
    dispatch({type:actions.SET_ACTIVE_PROJECT_REQUEST});
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board-with-details/${id}`,
        method: "GET",
      });

      if (res.error){
        showToast({toastId,type:"error",message:"Failed to get your project."})
        dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE,payload:res.error});
        setIsNotFound(true);
        return;
      }
  
      const formattedIdResponse = convertIdFields(res?.data?.board || {});
      dispatch({ type: actions.SET_ACTIVE_PROJECT_SUCCESS, payload: formattedIdResponse });
  };
  
  useEffect(() => {
    if (id && activeProject?.id !== id) getProjectById(id);
  }, [id]);

  return {getProjectById,activeProject,loadingActiveProject,errorActiveProject,projectVersion,isNotFound };
};

export default useGetProject;