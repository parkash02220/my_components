import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
import useToast from "../common/useToast";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from "@/context/Organization/action";
import { convertIdFields } from "@/utils";
const useGetDesignationsByDepartment = (departmentId) => {
  const toastId = "designations_by_department";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useOrganizationContext();
  const { designationsByDepartment } = state;
  const designations = designationsByDepartment[departmentId];
  const fetchDesignationByDepartment = useCallback(async () => {
    if (!departmentId) return;
    setLoading(true);
    setError(null);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/designations/${departmentId}`,
      method: "GET",
    });

    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message: res?.error?.message || "Error while fetching designations",
      });
      return;
    }

    const convertedIdResponse = convertIdFields(res?.data?.designations || []);
    dispatch({
      type: actions.SET_DESIGNATION_BY_DEPARTMENT,
      payload: { departmentId, designation: convertedIdResponse },
    });

    setLoading(false);
  }, [departmentId, showToast]);

  useEffect(() => {
    if (!departmentId || designations?.length > 0) return;
    fetchDesignationByDepartment();
  }, [departmentId, fetchDesignationByDepartment, designations]);

  return {
    designations,
    loading,
    error,
  };
};

export default useGetDesignationsByDepartment;
