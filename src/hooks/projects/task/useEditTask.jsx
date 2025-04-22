import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useRef, useState } from "react";

const useEditTask = () => {
    const {dispatch} = useAppContext();
    const [loadingEditTask,setLoadingEditTask] = useState(false);
    const [errorEditTask,setErrorEditTask] = useState(false);
    const controllerRef = useRef(new AbortController());

    const updateTaskInBackend = async (formData,taskId) => {
        controllerRef.current.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        setLoadingEditTask(true);
        setErrorEditTask(false);
        console.log("::formdata in edit task",formData)
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
            method:"PUT",
            body:formData,
            signal:controller.signal,
        });
        setLoadingEditTask(false);
        if(res.error){
            console.log("::error while editing task",true);
            setErrorEditTask(true);
        }

        
        const formattedIdResponse = convertIdFields(res?.data?.task || {});
        dispatch({type:"EDIT_TASK",payload:{...formattedIdResponse}})
    }
    return {loadingEditTask,errorEditTask,updateTaskInBackend}
}
export default useEditTask;