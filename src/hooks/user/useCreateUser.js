import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";
import useUploadProfileImage from "./activeUser/useUploadProfileImage";

const useCreateUser = () => {
  const toastId = "create_user";
  const { showToast } = useToast();
  const {
    uploadProfileImage,
    progress,
    loadingUploadProfile,
    errorUploadProfile,
    uploadedImageUrl,
  } = useUploadProfileImage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createUser = useCallback(
    async (userData, file) => {
      showToast({ toastId, type: "loading", message: "Creating user..." });
      setLoading(true);
      setError(null);
      const filteredUser = Object.fromEntries(Object.entries(userData)?.filter(([key,value]) => value?.trim() !== "" && value !== undefined && value !== null));

      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/add-user`,
        method: "POST",
        body: filteredUser,
      });

      if (res.error) {
        setLoading(false);
        setError(res.error.message || "something went wrong");
        showToast({
          toastId,
          type: "error",
          message: "Failed to create user. Please try again.",
        });
        return false;
      }
      const userId = res?.data?.user?.id;
      if (file) {
        await uploadProfileImage(file, userId);
      }
      setLoading(false);
      showToast({
        toastId,
        type: "success",
        message: "User created successfully",
      });
      return true;
    },
    [showToast]
  );
  return { loadingCreateUser: loading, errorCreateUser: error, createUser };
};
export default useCreateUser;
