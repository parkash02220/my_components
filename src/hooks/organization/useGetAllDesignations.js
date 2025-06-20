import { useCallback, useEffect, useRef, useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields } from "@/utils";
import * as actions from "@/context/Organization/action";
import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
const useGetAllDesignations = () => {
  const toastId = "all_designations";
  const { showToast } = useToast();
  const { state, dispatch } = useOrganizationContext();
  const { allDesignations, loading, error } = state;
  const hasFetchedOnce = useRef(false);
  const fetchAllDesignations = useCallback(async () => {
    dispatch({ type: actions.GET_ALL_DESIGNATION_REQUEST });
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/designations`,
      method: "GET",
    });

    if (res.error) {
      dispatch({
        type: actions.GET_ALL_DESIGNATION_FAILURE,
        payload: res?.error,
      });
      showToast({
        toastId,
        type: "error",
        message: res?.error?.message || "Error while fetching designations",
      });
      hasFetchedOnce.current = true;
    }

    const convertedIdResponse = convertIdFields(res?.data?.designations || []);
    dispatch({
      type: actions.GET_ALL_DESIGNATION_SUCCESS,
      payload: convertedIdResponse,
    });
    hasFetchedOnce.current = true;
  }, [showToast, dispatch]);

  useEffect(() => {
    if (hasFetchedOnce.current || allDesignations?.allIds?.length > 0) return;
    fetchAllDesignations();
  }, []);

  return {
    loading,
    error,
    fetchAllDesignations,
    allDesignations: allDesignations?.allIds?.map(
      (id) => allDesignations?.byIds[id]
    ),
    hasFetchedOnce: hasFetchedOnce.current,
  };
};
export default useGetAllDesignations;
