import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import * as actions from '@/context/action';
import useToast from "@/hooks/common/useToast";
const useGetTask = () => {
  const toastId = 'get_task';
  const {showToast} = useToast();
  const {dispatch,state} = useAppContext();
  const {activeTask,loading,error} = state;
  const {loadingActiveTask} = loading;
  const {errorActiveTask} = error;
  const getTaskFromBackend = useCallback(async (taskId) => {
    dispatch({type:actions.SET_ACTIVE_TASK_REQUEST});

      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-task/${taskId}`,
        method: "GET",
      });
  
      if (res.error) {
        showToast({toastId,type:"error",message:"Failed to fetch task. Please try again."})
        dispatch({type:actions.SET_ACTIVE_TASK_FAILURE,payload:res.error});
        return;
      }
  
      const data = res?.data;
      const formattedIdResponse = convertIdFields(res?.data?.task);
      dispatch({type:actions.SET_ACTIVE_TASK_SUCCESS,payload:{...formattedIdResponse}});
      return data;
  }, []);

  return {activeTask,loadingActiveTask,errorActiveTask,getTaskFromBackend };
};

export default useGetTask;