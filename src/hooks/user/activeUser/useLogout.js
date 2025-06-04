import { useAppContext } from "@/context/App/AppContext";
import { ApiCall } from "@/utils/ApiCall";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as actions from '@/context/App/action';
const useLogout = () => {
   const {dispatch} = useAppContext();
   const [loadingLogout,setLoadingLogout] = useState(false);
   const router = useRouter();
   const logoutUser = async () => {
    setLoadingLogout(true);
    Cookies.remove("auth_token", { path: "/" });
    console.log(":::inside logout")
    dispatch({type:actions.REMOVE_ACTIVE_USER});
     router.push("/signin");
    setLoadingLogout(false);
   }

   return {loadingLogout,logoutUser};
}
export default useLogout;