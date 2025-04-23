import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useGetTask = () => {
  const {dispatch} = useAppContext();
  const [loadingGetTask, setLoadingGetTask] = useState(false);
  
  const getTaskFromBackend = useCallback(async (taskId) => {
    setLoadingGetTask(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-task/${taskId}`,
      method: "GET",
    });
    setLoadingGetTask(false);

    if (res.error) {
      console.log("::error while getting task from backend", res);
      return;
    }

    const data = res?.data;
    const formattedIdResponse = convertIdFields(res?.data?.task);
    dispatch({type:"SET_ACTIVE_TASK",payload:{...formattedIdResponse}});
    return data;
  }, []);

  return { loadingGetTask, getTaskFromBackend };
};

export default useGetTask;