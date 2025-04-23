import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useCreateSubTask = () => {
    const {dispatch} = useAppContext();
    const [loadingCreateSubTask,setLoadingCreateSubTask] = useState(false);
    const addSubTaskToBackend = async (taskId,title) => {
        setLoadingCreateSubTask(true);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/add-subtask/${taskId}`,
            method:"POST",
            body:{title},
        });
        setLoadingCreateSubTask(false);
        if(res.error){
            console.log("::error while adding subtask",res);
            return;
        }

        const formattedIdResponse = convertIdFields(res?.data?.subtask || {});

        dispatch({type:"ADD_SUBTASK",payload:formattedIdResponse})
    }

    return {loadingCreateSubTask,addSubTaskToBackend};
}

export default useCreateSubTask;