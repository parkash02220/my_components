import { useCallback, useEffect, useRef, useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields } from "@/utils";
import * as actions from "@/context/Organization/action";
import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
const useGetAllDepartments = () => {
  const toastId = "all_departments";
  const { showToast } = useToast();
  const { state, dispatch } = useOrganizationContext();
  const { allDepartments, loading, error } = state;
  const hasFetchedOnce = useRef(false);
  const fetchAllDepartments = useCallback(async () => {
    dispatch({ type: actions.GET_ALL_DEPARTMENTS_REQUEST });
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/departments`,
      method: "GET",
    });

    if (res.error) {
      dispatch({
        type: actions.GET_ALL_DEPARTMENTS_FAILURE,
        payload: res?.error,
      });
      showToast({
        toastId,
        type: "error",
        message: res?.error?.message || "Error while fetching departments",
      });
      hasFetchedOnce.current = true;
    }

    const convertedIdResponse = convertIdFields(res?.data?.departments || []);
    dispatch({
      type: actions.GET_ALL_DEPARTMENTS_SUCCESS,
      payload: convertedIdResponse,
    });
    hasFetchedOnce.current = true;
  }, [showToast, dispatch]);

  useEffect(() => {
    if (hasFetchedOnce.current || state.allDepartments?.length > 0) return;
    fetchAllDepartments();
  }, []);

  return {
    loading,
    error,
    fetchAllDepartments,
    allDepartments,
    hasFetchedOnce: hasFetchedOnce.current,
  };
};
export default useGetAllDepartments;
