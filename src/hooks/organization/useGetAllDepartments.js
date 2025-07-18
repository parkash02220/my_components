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
    }

    const convertedIdResponse = convertIdFields(res?.data?.departments || []);
    dispatch({
      type: actions.GET_ALL_DEPARTMENTS_SUCCESS,
      payload: convertedIdResponse,
    });
  }, [showToast, dispatch]);

  useEffect(() => {
    if (hasFetchedOnce.current || allDepartments?.allIds?.length > 0) return;
    hasFetchedOnce.current = true;
    fetchAllDepartments();
  }, [allDepartments]);

  return {
    loading,
    error,
    fetchAllDepartments,
    allDepartments: allDepartments?.allIds?.map(
      (id) => allDepartments?.byIds[id]
    ),
    hasFetchedOnce: hasFetchedOnce.current,
  };
};
export default useGetAllDepartments;
