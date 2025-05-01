import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useState } from "react";
import * as actions from '@/context/action';
const useGetProject = (id) => {
  const { dispatch } = useAppContext();

  const getProjectById = async (id) => {
    dispatch({type:actions.SET_ACTIVE_PROJECT_REQUEST});
    try {
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board-with-details/${id}`,
        method: "GET",
      });

      if (res.error){
        dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE});
        return;
      }
  
      const formattedIdResponse = convertIdFields(res?.data?.board || {});
      dispatch({ type: actions.SET_ACTIVE_PROJECT_SUCCESS, payload: formattedIdResponse });
    } catch (error) {
      dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE});
    }
  };

  useEffect(() => {
    if (id) getProjectById(id);
  }, [id]);

  return {getProjectById };
};

export default useGetProject;