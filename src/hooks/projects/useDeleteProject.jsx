import { useAppContext } from "@/context/AppContext";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useDeleteProject = () => {
    const {dispatch} = useAppContext();
    const [loadingDeleteProject,setLoadingDeleteProject] = useState(false);
    const [errorDeleteProject,setErrorDeleteProject] = useState(false);
    const deleteProject = async (projectId) => {
        setLoadingDeleteProject(true);
        setErrorDeleteProject(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-board/${projectId}`,
            method:"DELETE",
        });

        setLoadingDeleteProject(false);
        if(res.error){
            console.log("::error while deleting project",res);
            setErrorDeleteProject(true);
            return;
        }
        dispatch({type:"DELETE_ACTIVE_PROJECT",payload:{projectId}});
    }
    return {loadingDeleteProject,errorDeleteProject,deleteProject};
}

export default useDeleteProject;