import { useAppContext } from "@/context/AppContext";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useClearSection = () => {
    const {dispatch} = useAppContext();
    const [loadingClearSection,setLoadingClearSection] = useState(false);
    const clearSection = async (sectionId) => {
        setLoadingClearSection(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/clear-section/${sectionId}`,
            method:"DELETE",
        });
        setLoadingClearSection(false);
         if(res.error){
             console.log("::error while clearing the section",res);
         }
        dispatch({type:"CLEAR_SECTION",payload:{sectionId}});
    } 
    return {loadingClearSection,clearSection};
}
export default useClearSection;