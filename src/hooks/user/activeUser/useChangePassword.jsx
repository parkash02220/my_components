import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import useToast from "../../common/useToast";

const useChangePassword = () => {
    const toastId = 'change_password';
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const changePassword = async (allPasswords)=>{
        showToast({toastId,type:"loading",message:"Changing password..."});
            setLoading(true);
            setError(null);
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
                method:"POST",
                body:allPasswords,
            });

            setLoading(false);
            if(res.error){
                  showToast({toastId,type:"error",message:res?.error?.message || "Failed to change password. Please try again."});
                  setError(res.error);
                  return false;
            }

            showToast({toastId,type:"success",message:res?.data?.message || "Password changed successfully."});
            return true;
    }

    return {
        loadingChangePassword:loading,
        errorChangePassword:error,
        changePassword,
    }
}
export default useChangePassword;