
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import * as actions from '@/context/Task/action';
import useToast from "@/hooks/common/useToast";
import { useTaskContext } from "@/context/Task/TaskContext";
const useGetTask = () => {
  const toastId = 'get_task';
  const {showToast} = useToast();
  const {dispatch,state} = useTaskContext();
  const {activeTask,loadingActiveTask,errorActiveTask} = state;
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
  }, [showToast,dispatch]);

  return {activeTask,loadingActiveTask,errorActiveTask,getTaskFromBackend };
};

export default useGetTask;