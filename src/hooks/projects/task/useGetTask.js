import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useGetTask = () => {
    const [loadingGetTask,setLoadingGetTask] = useState(false);
    const getTaskFromBackend = async (taskId) => {
          setLoadingGetTask(true);
          const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-task/${taskId}`,
            method:"GET",
          });

          setLoadingGetTask(false);
          if(res.error){
            console.log("::error while getting task from backend",res);
          }

          const data = res?.data;
          console.log("::data in usegettask",data);
    } 
    return {loadingGetTask,getTaskFromBackend};
}
export default useGetTask;