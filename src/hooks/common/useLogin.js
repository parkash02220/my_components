import { setAuthTokenToCookies } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
   const [loadingLogin,setLoadingLogin] = useState(false);
   const router = useRouter();
   const loginUser = async (email,password,setErrorMsg) => {
    setLoadingLogin(true);
    setErrorMsg("");
    const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
        method: "POST",
        body: {
          email,
          password,
        },
      });
    setLoadingLogin(false);
    if (res.error) {
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
   return {loadingLogin,loginUser};
}
export default useLogin;