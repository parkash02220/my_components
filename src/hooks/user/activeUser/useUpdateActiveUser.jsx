
import { useAppContext } from "@/context/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useUpdateActiveUser = () => {
    const toastId = 'update_active_user';
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const userId = useAppContext()?.state?.activeUser?.id;
    const updateActiveUser = async (userDetails) => {
        if(!userId){
            showToast({ toastId, type: "error", message: "User id is missing..." });
            return;
          }
        showToast({toastId,type:"loading",message:"Updating user..."});
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/update-user/${userId}`,
            method:"PUT",
            body:userDetails,
        });
        setLoading(false);
        if(res.error){
            setError(res.error.message || "something went wrong");
            showToast({toastId,type:"error",message:"Failed to update user details. Please refresh the page"});
            return;
        }
        showToast({toastId,type:"success",message:"User updted successfully."});


    }

    return {loadingUpdateActiveUser:loading,errorUpdateActiveUser:error,updateActiveUser};
}
export default useUpdateActiveUser;