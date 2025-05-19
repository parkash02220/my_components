import useToast from "@/hooks/common/useToast";
import { setAuthTokenToCookies } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const useLogin = () => {
  const toastId = "login_toast";
  const { showToast } = useToast();
   const [loadingLogin,setLoadingLogin] = useState(false);
   const [errorLogin,setErrorLogin] = useState(false);
   const [errorMsg,setErrorMsg] = useState('');
   const router = useRouter();
   const loginUser = async (userData) => {
     showToast({message:"Authenticating your account...",type:"loading",toastId});
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
      toast.dismiss(toastId);
      setErrorLogin(true);
      const error = res?.error?.data?.error || "something went wrong";
      setErrorMsg(error);
      showToast({message:error || "Login failed please try again...",type:"error",toastId});
         return;
       }


       const { token } = res?.data;
       if (token) {
        toast.dismiss(toastId);
        showToast({message:"Welcome back! You have logged in successfully.",type:"success",toastId});
         setAuthTokenToCookies(token);
         router.push("/home");
       }
   }
   return {loadingLogin,loginUser,errorMsg,errorLogin};
}
export default useLogin;