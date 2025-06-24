import { useAppContext } from "@/context/App/AppContext";
import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import * as actions from "@/context/App/action";
const useUpdateActiveUser = () => {
  const toastId = "update_active_user";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, state } = useAppContext();
  const userId = state?.activeUser?.id;
  const updateActiveUser = async (userDetails) => {
    if (!userId) {
      showToast({ toastId, type: "error", message: "User id is missing..." });
      return;
    }
    showToast({ toastId, type: "loading", message: "Updating user..." });
    setLoading(true);
    setError(null);
    const filteredUserDetails = Object.fromEntries(
      Object.entries(userDetails)?.filter(([key,value]) => value?.trim() !== "" && value !== undefined && value !== null)
    );
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/update-user/${userId}`,
      method: "PUT",
      body: filteredUserDetails,
    });

    if (res.error) {
      setLoading(false);
      setError(res.error.message || "something went wrong");
      showToast({
        toastId,
        type: "error",
        message: "Failed to update user details. Please refresh the page",
      });
      return;
    }
    setLoading(false);
    const convertIdResponse = convertIdFields(res?.data?.user || {});
    dispatch({
      type: actions.SET_ACTIVE_USER_SUCCESS,
      payload: convertIdResponse,
    });
    showToast({
      toastId,
      type: "success",
      message: "User updted successfully.",
    });
  };

  return {
    loadingUpdateActiveUser: loading,
    errorUpdateActiveUser: error,
    updateActiveUser,
  };
};
export default useUpdateActiveUser;
