import { setAuthTokenToCookies } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
   const [loadingLogin,setLoadingLogin] = useState(false);
   const [errorLogin,setErrorLogin] = useState(false);
   const [errorMsg,setErrorMsg] = useState('');
   const router = useRouter();
   const loginUser = async (userData) => {
    setLoadingLogin(true);
    setErrorLogin(false);
    setErrorMsg("");
    const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
        method: "POST",
        body: userData,
      });
    setLoadingLogin(false);
    if (res.error) {
      setErrorLogin(true);
         const error = res?.error?.data?.error || "something went wrong";
         setErrorMsg(error);
         return;
       }
       const { token } = res?.data;
       if (token) {
         setAuthTokenToCookies(token);
         router.push("/home");
       }
   }
   return {loadingLogin,loginUser,errorMsg,errorLogin};
}
export default useLogin;