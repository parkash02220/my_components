// hooks/useUpdateColumnPosition.js
import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useUpdateColumnPosition = () => {
    const toastId = 'move_column';
    const {showToast} = useToast();
    const {dispatch} = useAppContext();
    const [loadingUpdatingColoumPos,setLoadingUpdatingColoumPos] = useState(false);

    const updateColumnPosition = async (columnId, position,boardId) => {
        setTimeout(() => {
            dispatch({type:"Move_SECTION",payload:{newPosition:position-1,columnId}});
        }, 0);
        setLoadingUpdatingColoumPos(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/move-section/${boardId}`,
            method:"PUT",
            body:{sectionId:columnId,newPosition:position},
        });

        setLoadingUpdatingColoumPos(false);

        if(res.error){
            showToast({
                toastId,
                type: "error",
                message: "Failed to move the section. Please refresh the page.",
              });
            console.log("::error while changing coloumn order",res);
            return;
        }

        const data = res?.data;
         showToast({
            toastId,
            type: "success",
            message: "Changes saved and synced with the server.",
          });
    }

  return {loadingUpdatingColoumPos, updateColumnPosition};
};

export default useUpdateColumnPosition;
