import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useClearSection = () => {
    const toastId = 'clear_section';
    const {showToast} = useToast();
    const {dispatch} = useAppContext();
    const [loadingClearSection,setLoadingClearSection] = useState(false);
    const clearSection = async (sectionId) => {
        dispatch({type:"CLEAR_SECTION",payload:{sectionId}});
        setLoadingClearSection(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/clear-tasks/${sectionId}`,
            method:"DELETE",
        });
        setLoadingClearSection(false);
         if(res.error){
            showToast({
                toastId,
                type: "error",
                message: "Failed to clear the section. Please refresh the page.",
              });
             console.log("::error while clearing the section",res);
             return;
         }
        showToast({
            toastId,
            type: "success",
            message: "Changes saved and synced with the server.",
          });
    } 
    return {loadingClearSection,clearSection};
}
export default useClearSection;