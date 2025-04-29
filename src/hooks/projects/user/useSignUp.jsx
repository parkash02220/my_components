
import useToast from "@/hooks/common/useToast";
import { setAuthTokenToCookies } from "@/utils";
import { useRouter } from "next/navigation";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")
const useSignUp = () => {
    const toastId = "register_toast";
    const {showToast} = useToast();
    const router = useRouter();
    const [loadingSignUp,setLoadingSignUp] = useState(false);
    const [errorSignUp,setErrorSignUp] = useState(false);
    const [responseMsg,setResponseMsg] = useState('');

    const signUpUser = async (userData) => {
        showToast({toastId,type:'loading',message:"Creating your account..."})
        setResponseMsg('');
        setLoadingSignUp(true);
        setErrorSignUp(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
            method:"Post",
            body:userData,
        });

        setLoadingSignUp(false);
        if(res.error){
        showToast({toastId,type:'error',message:"Registration failed. Please try again."})
            console.log("::error while signing up user",res);
            setErrorSignUp(true);
            setResponseMsg(res?.error?.data?.error || '')
            return;
        }
          
        const { token } = res?.data;
       if (token) {
        showToast({toastId,type:'success',message:"Account created successfully! Welcome aboard."})
         setAuthTokenToCookies(token);
         router.push("/home");
       }
    }

    return {loadingSignUp,errorSignUp,responseMsg,signUpUser};
}

export default useSignUp;