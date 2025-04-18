import { useAppContext } from "@/context/AppContext";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useMoveTask = () => {

    const [loadingMoveTask,setLoadingMoveTask] = useState(false);
    const {dispatch} = useAppContext();
    const moveTask = async (taskId,toSectionId,newPosition) => {
        setLoadingMoveTask(true);

        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/move-task`,
            method:"POST",
            body:{taskId,toSectionId,newPosition},
        });

        setLoadingMoveTask(false);
        if(res.error){
            console.log("::error whhile updating task");
            return;
        }

        const data = res?.data;
        dispatch({type:"MOVE_TASK",payload:{taskId,toSectionId,newPosition}});

    }

  return { loadingMoveTask,moveTask };
};

export default useMoveTask;
