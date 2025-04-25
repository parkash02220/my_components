

import { useAppContext } from "@/context/AppContext";
import { setAuthTokenToCookies } from "@/utils";
import { useRouter } from "next/navigation";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useSignUp = () => {
    const router = useRouter();
    const {dispatch} = useAppContext();
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
          
        const { token,user } = res?.data;

       dispatch({type:"SET_ACTIVE_USER",payload:user})
       if (token) {
         setAuthTokenToCookies(token);
         router.push("/home");
       }
    }

    return {loadingSignUp,errorSignUp,responseMsg,signUpUser};
}

export default useSignUp;