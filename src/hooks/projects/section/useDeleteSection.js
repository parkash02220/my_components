import { useAppContext } from "@/context/AppContext";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteSection = () => {
    const {dispatch} = useAppContext();
    const [loadingDeleteSection,setLoadingDeleteSection] = useState(false);
    const deleteSection = async (sectionId) => {
        setLoadingDeleteSection(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-section/${sectionId}`,
            method:"DELETE",
        });
        setLoadingDeleteSection(false);
         if(res.error){
             console.log("::error while deleting the section",res);
         }
        dispatch({type:"DELETE_SECTION",payload:{sectionId}});
    } 
    return {loadingDeleteSection,deleteSection};
}
export default useDeleteSection;