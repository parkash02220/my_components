import { useAppContext } from "@/context/AppContext";
import { ApiCall } from "@/utils/ApiCall";
import { useState, useCallback } from "react";
const useUploadAttachments = () => {
  const {dispatch} = useAppContext();
  const [loadingUploadAttachments,setLoadingUploadAttachments] = useState(false);
  const [progressUploadAttachments, setProgressUploadAttachments] = useState(0);
  const [errorUploadAttachments, setErrorUploadAttachments] = useState(null);
  const [successUploadAttachments, setSuccessUploadAttachments] = useState(false);

  const uploadImage = useCallback(
    async (files,taskId,columnId) => {
      setProgressUploadAttachments(0);
      setErrorUploadAttachments(null);
      setSuccessUploadAttachments(false);
      setLoadingUploadAttachments(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      const res = await ApiCall({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/upload-task-image/${taskId}`,
        method:"POST",
        onUploadProgress: (event) => {
          console.log("::event.loaded",event.loaded);
          console.log("::event.total",event.total);

            const percentage = Math.round((event.loaded * 100) / event.total);
            setProgressUploadAttachments(percentage);
          },
        body:formData,
      });

      setLoadingUploadAttachments(false);

      if(res.error){
        console.log("::errro while uploading image",res.error)
        setErrorUploadAttachments(true);
        return;
      }

      setSuccessUploadAttachments(true);
      console.log("::response image uploaded",res.data)
       const images = res?.data?.images;
         dispatch({type:"ADD_IMAGE_TO_TASK",payload:{images,taskId,columnId}});
    },
    []
  );

  return { uploadImage, progressUploadAttachments, errorUploadAttachments, successUploadAttachments,loadingUploadAttachments };
};
export default useUploadAttachments;