
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from '@/context/Projects/action';
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useDeleteSection = () => {
    const toastId = "delete_section";
    const {showToast} = useToast();
    const {dispatch} = useProjectsContext();
    const [loading,setLoading] = useState(false);
    const deleteSection = async (sectionId) => {
        showToast({toastId,type:"loading",message:"Deleting section..."});
        setLoading(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-section/${sectionId}`,
            method:"DELETE",
        });
        if(res.error){
             setLoading(false);
            showToast({toastId,type:"error",message:"Failed to delete section. Please try again."});
             return;
         }
          setLoading(false);
        dispatch({type:actions.DELETE_SECTION,payload:{sectionId}});
        showToast({toastId,type:"success",message:"Section deleted successfully."})
    } 
    return {loadingDeleteSection:loading,deleteSection};
}
export default useDeleteSection;