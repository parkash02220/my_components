import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useCreateUser = () => {
    const toastId = 'create_user';
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const createUser = useCallback(async (userData) => {
        showToast({toastId,type:"loading",message:"Creating user..."});
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/add-user`,
            method:"POST",
            body:userData,
        });
        
        if(res.error){
            setLoading(false);
            setError(res.error.message || 'something went wrong')
            showToast({toastId,type:"error",message:"Failed to create user. Please try again."});
            return false;
        }
        setLoading(false);
        showToast({toastId,type:"success",message:"User created successfully"});
        return true;
    },[showToast])
    return {loadingCreateUser:loading,errorCreateUser:error,createUser};
}
export default useCreateUser;