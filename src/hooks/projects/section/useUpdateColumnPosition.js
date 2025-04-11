// hooks/useUpdateColumnPosition.js
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useUpdateColumnPosition = () => {

    const [loadingUpdatingColoumPos,setLoadingUpdatingColoumPos] = useState(false);

    const updateColumnPosition = async (columnId, position,boardId) => {
        setLoadingUpdatingColoumPos(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/move-section/${boardId}`,
            method:"PUT",
            body:{sectionId:columnId,newPosition:position},
        });

        setLoadingUpdatingColoumPos(false);

        if(res.error){
            console.log("::error while changing coloumn order",res);
            return;
        }

        const data = res?.data;
        console.log("::data",res?.data);
    }

  return {loadingUpdatingColoumPos, updateColumnPosition};
};

export default useUpdateColumnPosition;
