import { useAppContext } from "@/context/AppContext";
import useToast from "../common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useDeleteProject = () => {
    const toastId = "delete_project";
    const {showToast} = useToast();
    const {dispatch} = useAppContext();
    const [loadingDeleteProject,setLoadingDeleteProject] = useState(false);
    const [errorDeleteProject,setErrorDeleteProject] = useState(false);
    const deleteProject = async (projectId) => {
        showToast({toastId,type:"loading",message:"Deleting your project..."});
        setLoadingDeleteProject(true);
        setErrorDeleteProject(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-board/${projectId}`,
            method:"DELETE",
        });

        setLoadingDeleteProject(false);
        if(res.error){
            showToast({toastId,type:"error",message:"Failed to delete project. Please try again."});
            console.log("::error while deleting project",res);
            setErrorDeleteProject(true);
            return;
        }
        showToast({toastId,type:"success",message:"Project deleted successfully."});
        dispatch({type:"DELETE_ACTIVE_PROJECT",payload:{projectId}});
    }
    return {loadingDeleteProject,errorDeleteProject,deleteProject};
}

export default useDeleteProject;