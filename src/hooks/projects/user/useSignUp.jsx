
import { setAuthTokenToCookies } from "@/utils";
import { useRouter } from "next/navigation";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useSignUp = () => {
    const router = useRouter();
    const [loadingSignUp,setLoadingSignUp] = useState(false);
    const [errorSignUp,setErrorSignUp] = useState(false);
    const [responseMsg,setResponseMsg] = useState('');

    const signUpUser = async (userData) => {
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
            console.log("::error while signing up user",res);
            setErrorSignUp(true);
            setResponseMsg(res?.error?.data?.error || '')
            return;
        }
          
        const { token } = res?.data;
       if (token) {
         setAuthTokenToCookies(token);
         router.push("/home");
       }
    }

    return {loadingSignUp,errorSignUp,responseMsg,signUpUser};
}

export default useSignUp;