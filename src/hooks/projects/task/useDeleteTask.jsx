import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteTask = () => {
    const [loadingDeleteTask,setLoadingDeleteTask] = useState(false);
    const [errorDeleteTask,setErrorDeleteTask] = useState(false);
    const deleteTaskFromBackend = async (taskId) => {
        setErrorDeleteTask(false);
        setLoadingDeleteTask(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/delete-task/${taskId}`,
            method:"DELETE",
        });
        setLoadingDeleteTask(false);
        if(res.error){
            console.log("::error while deleting the task",res);
            setErrorDeleteTask(true);
        }
        console.log("::data in use delete task",res);
    }
    return {loadingDeleteTask,errorDeleteTask,deleteTaskFromBackend}
} 
export default useDeleteTask;