import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import * as actions from '@/context/action';
const useGetTask = () => {
  const {dispatch} = useAppContext();
  
  const getTaskFromBackend = useCallback(async (taskId) => {
    dispatch({type:actions.SET_ACTIVE_TASK_REQUEST});
    try {
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-task/${taskId}`,
        method: "GET",
      });
  
      if (res.error) {
        dispatch({type:actions.SET_ACTIVE_TASK_FAILURE});
        return;
      }
  
      const data = res?.data;
      const formattedIdResponse = convertIdFields(res?.data?.task);
      dispatch({type:actions.SET_ACTIVE_TASK_SUCCESS,payload:{...formattedIdResponse}});
      return data;
    } catch (error) {
      dispatch({type:actions.SET_ACTIVE_TASK_FAILURE});
    }
  }, []);

  return {getTaskFromBackend };
};

export default useGetTask;