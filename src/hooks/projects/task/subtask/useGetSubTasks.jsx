const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetSubTasks = ( ) => {
    const [loadingSubTasks,setLoadingSubTasks] = useState(false);
    const [errorSubTasks,setErrorSubTasks] = useState(false);
    const getSubTasksFromBackend = async () => {
        setLoadingSubTasks(true);
        setErrorSubTasks(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-subtasks/${taskId}`,
            method:"GET"
        });

        setLoadingSubTasks(false);
        if(res.error){
            console.log("::error while getting subtasks from backen",res);
            setErrorSubTasks(true);
            return;
        }
    }
    useEffect(()=> {

    },[])
}