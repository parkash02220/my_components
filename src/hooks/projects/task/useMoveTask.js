import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useMoveTask = () => {
    const toastId = 'move_task';
    const {showToast} = useToast();
    const [loadingMoveTask,setLoadingMoveTask] = useState(false);
    const {dispatch} = useAppContext();
    const moveTask = async (taskId,toSectionId,newPosition) => {
        setLoadingMoveTask(true);
        setTimeout(() => {
            dispatch({type:"MOVE_TASK",payload:{taskId,toSectionId,newPosition:newPosition-1}});
        }, 0);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/move-task`,
            method:"POST",
            body:{taskId,toSectionId,newPosition},
        });

        setLoadingMoveTask(false);
        if(res.error){
            showToast({
                toastId,
                type: "error",
                message: "Failed to move the task. Please refresh the page.",
              });
            console.log("::error whhile updating task");
            return;
        }

        const data = res?.data;
         showToast({
      toastId,
      type: "success",
      message: "Changes saved and synced with the server.",
    });
    }

  return { loadingMoveTask,moveTask };
};

export default useMoveTask;
