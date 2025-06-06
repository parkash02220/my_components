
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from '@/context/Projects/action';
const useClearSection = () => {
    const toastId = 'clear_section';
    const {showToast} = useToast();
    const {dispatch} = useProjectsContext();
    const [loading,setLoading] = useState(false);
    const clearSection = async (sectionId) => {
        dispatch({type:actions.CLEAR_SECTION,payload:{sectionId}});
        setLoading(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/clear-tasks/${sectionId}`,
            method:"DELETE",
        });
        if(res.error){
             setLoading(false);
            showToast({
                toastId,
                type: "error",
                message: "Failed to clear the section. Please refresh the page.",
              });
             return;
         }
           setLoading(false);
        showToast({
            toastId,
            type: "success",
            message: "Changes saved and synced with the server.",
          });
    } 
    return {loadingClearSection:loading,clearSection};
}
export default useClearSection;