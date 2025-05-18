import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLogout = () => {
   const [loadingLogout,setLoadingLogout] = useState(false);
   const router = useRouter();
   const logoutUser = async () => {
    setLoadingLogout(true);
    Cookies.remove("auth_token");
     router.push("/signin");
    setLoadingLogout(false);
   }

   useEffect(()=>{
     router.prefetch("/signin");
   },[]);
   return {loadingLogout,logoutUser};
}
export default useLogout;