
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import * as actions from '@/context/Projects/action';
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useUpdateColumnPosition = () => {
    const toastId = 'move_column';
    const {showToast} = useToast();
    const {dispatch} = useProjectsContext();
    const [loading,setLoading] = useState(false);

    const updateColumnPosition = async (columnId, position,boardId) => {
        setTimeout(() => {
            dispatch({type:actions.Move_SECTION,payload:{newPosition:position-1,columnId}});
        }, 0);
        setLoading(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/move-section/${boardId}`,
            method:"PUT",
            body:{sectionId:columnId,newPosition:position},
        });



        if(res.error){
                  setLoading(false);
            showToast({
                toastId,
                type: "error",
                message: "Failed to move the section. Please refresh the page.",
              });
            return;
        }
        setLoading(false);
        const data = res?.data;
         showToast({
            toastId,
            type: "success",
            message: "Changes saved and synced with the server.",
          });
    }

  return {loadingUpdatingColoumPos:loading, updateColumnPosition};
};

export default useUpdateColumnPosition;
