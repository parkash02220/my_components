import { ApiCall } from "@/utils/ApiCall";
import { useState, useCallback } from "react";
const useUploadAttachments = () => {
  const [loadingUploadAttachments,setLoadingUploadAttachments] = useState(false);
  const [progressUploadAttachments, setProgressUploadAttachments] = useState(0);
  const [errorUploadAttachments, setErrorUploadAttachments] = useState(null);
  const [successUploadAttachments, setSuccessUploadAttachments] = useState(false);

  const uploadImage = useCallback(
    async (files,taskId) => {
      setProgressUploadAttachments(0);
      setErrorUploadAttachments(null);
      setSuccessUploadAttachments(false);
      setLoadingUploadAttachments(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      for (let pair of formData.entries()) {
        console.log("FormData key:", pair[0]);
        console.log("FormData value:", pair[1]);
      }
      const res = await ApiCall({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/upload-task-image/${taskId}`,
        method:"POST",
        onUploadProgress: (event) => {
            const percentage = Math.round((event.loaded * 100) / event.total);
            setProgressUploadAttachments(percentage);
          },
        body:formData,
      });

      setLoadingUploadAttachments(false);

      if(res.error){
        console.log("::errro while uploading image",res.error)
        setErrorUploadAttachments(true);
      }

      setSuccessUploadAttachments(true);
      console.log("::response in upload attachmetns ",res);
    },
    []
  );

  return { uploadImage, progressUploadAttachments, errorUploadAttachments, successUploadAttachments,loadingUploadAttachments };
};
export default useUploadAttachments;