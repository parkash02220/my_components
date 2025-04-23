const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useToggleAssignTask = () => {
    const [loadingAssignTaskIds,setLoadingAssignTaskIds] = useState([]);
    const [errorAssignTask,setErrorAssignTask] =  useState(false);
    const toggleAssignTask = async (taskId,assignedUserIds,userId) => {
        setLoadingAssignTaskIds((pre)=> [...pre,userId]);
        setErrorAssignTask(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${taskId}`,
            method:"PUT",
            body : {
                assigned_to:assignedUserIds,
            }
        });

        setLoadingAssignTaskIds((pre)=> pre?.filter((id)=> id !== userId));
           
        if(res.error){
            console.log("::error while changing state of assign task",res);
            setErrorAssignTask(true);
            return;
        }
 
    }
    return {loadingAssignTaskIds,errorAssignTask,toggleAssignTask};
}

export default useToggleAssignTask;