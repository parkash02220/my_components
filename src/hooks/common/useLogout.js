import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout = () => {
   const [loadingLogout,setLoadingLogout] = useState(false);
   const router = useRouter();
   const logoutUser = async () => {
    setLoadingLogout(true);
    // const res = await ApiCall({
    //     url:`${NEXT_PUBLIC_BASE_URL}/logout`,
    //     method:"POST",
    // });
    setLoadingLogout(false);
    // if(res.error){
    //     console.log("::error while loging out user",res);
    //     return;
    // }
    Cookies.remove("auth_token");
     router.push("/signin");
   }
   return {loadingLogout,logoutUser};
}
export default useLogout;