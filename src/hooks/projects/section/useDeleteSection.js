import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteSection = () => {
    const toastId = "delete_section";
    const {showToast} = useToast();
    const {dispatch} = useAppContext();
    const [loadingDeleteSection,setLoadingDeleteSection] = useState(false);
    const deleteSection = async (sectionId) => {
        showToast({toastId,type:"loading",message:"Deleting section..."});
        setLoadingDeleteSection(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-section/${sectionId}`,
            method:"DELETE",
        });
        setLoadingDeleteSection(false);
         if(res.error){
            showToast({toastId,type:"error",message:"Failed to delete section. Please try again."});
             console.log("::error while deleting the section",res);
             return;
         }
        dispatch({type:"DELETE_SECTION",payload:{sectionId}});
        showToast({toastId,type:"success",message:"Section deleted successfully."})
    } 
    return {loadingDeleteSection,deleteSection};
}
export default useDeleteSection;