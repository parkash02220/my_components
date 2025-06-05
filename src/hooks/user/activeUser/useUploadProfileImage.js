// hooks/user/activeUser/useUploadProfileImage.js
import { useState, useCallback } from "react";
import { ApiCall } from "@/utils/ApiCall";
import useToast from "@/hooks/common/useToast";

const useUploadProfileImage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const { showToast } = useToast();
  const toastId = "upload_profile_image";

  const uploadProfileImage = useCallback(async (file,userId=null) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    setUploadedImageUrl(null);

    const formData = new FormData();
    formData.append("avatar", file);
     let url;
     if(userId){
       url = `${process.env.NEXT_PUBLIC_BASE_URL}/upload-profile-image?userId=${userId}`;
     }else{
       url = `${process.env.NEXT_PUBLIC_BASE_URL}/upload-profile-image`;
     }
    const res = await ApiCall({
      url,
      method: "POST",
      body: formData,
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      },
    });

    setLoading(false);

    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to upload image. Please try again.",
      });
      setError(res.error);
      return null;
    }

    const imageUrl = res?.data?.avatar;
    setUploadedImageUrl(imageUrl);
    showToast({
      toastId,
      type: "success",
      message: "Image uploaded successfully.",
    });
    return imageUrl;
  }, []);

  return {
    uploadProfileImage,
    progress,
    loadingUploadProfile: loading,
    errorUploadProfile: error,
    uploadedImageUrl,
  };
};

export default useUploadProfileImage;
