import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useCallback, useState } from "react";

const useCreateUser = () => {
    const toastId = 'create_user';
    const {showToast} = useToast();
    const [loadingCreateUser,setLoadingCreateUser] = useState(false);
    const [errorCreateUser,setErrorCreateUser] = useState(null);
    const createUser = useCallback(async (userData) => {
        showToast({toastId,type:"loading",message:"Creating user..."});
        setLoadingCreateUser(true);
        setErrorCreateUser(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/add-user`,
            method:"POST",
            body:userData,
        });
        setLoadingCreateUser(false);
        if(res.error){
            showToast({toastId,type:"error",message:"Failed to create user. Please try again."});
            setErrorCreateUser(res.error.message || 'something went wrong')
            return;
        }
        console.log("::res in use create user hook",res)
        showToast({toastId,type:"success",message:"User created successfully"});
    },[showToast])
    return {loadingCreateUser,errorCreateUser,createUser};
}
export default useCreateUser;