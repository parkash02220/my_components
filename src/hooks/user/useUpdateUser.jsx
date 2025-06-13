import { convertIdFields } from "@/utils";

const { default: useToast } = require("@/hooks/common/useToast");
const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");

const useUpdateUser = () => {
  const toastId = "update_user";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateUser = async (userDetails, userId) => {
    showToast({ toastId, type: "loading", message: "Updating user..." });
    setLoading(true);
    setError(null);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/update-user/${userId}`,
      method: "PUT",
      body: userDetails,
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
    showToast({
      toastId,
      type: "success",
      message: "User updted successfully.",
    });
    const convertedIdResponse = convertIdFields(res?.data?.user);
    return convertedIdResponse;
  };

  return { loadingUpdateUser: loading, errorUpdateUser: error, updateUser };
};
export default useUpdateUser;
