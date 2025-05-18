import { useAppContext } from "@/context/App/AppContext";
import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import useLogout from "./useLogout";
import { useState } from "react";

const useDeleteActiveUser = () => {
    const toastId = "delete_active_user";
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = useAppContext()?.state?.activeUser?.id;
    const {loadingLogout,logoutUser} = useLogout();
    const deleteActiveUser = async () => {
      if(!userId){
        showToast({ toastId, type: "error", message: "User id is missing..." });
        return;
      }
      showToast({ toastId, type: "loading", message: "Deleting user..." });
      setLoading(true);
      setError(null);
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-user`,
        method: "DELETE",
        body: {
          userIds:[userId],
        },
      });
     
      if(res.error){
         setLoading(false);
          showToast({toastId,type:"error",message:res?.error?.message || "Failed to delete user. Please try again."});
          setError(res?.error?.message || "something went wrong");
          return;
      }
       setLoading(false);
        showToast({toastId,type:"success",message:res?.data?.message || "User deleted successfully."});
        logoutUser();
    };
    return {
      loadingDeleteActiveUser:loading,
      errorDeleteActiveUser:error,
      deleteActiveUser,
    }
}
export default useDeleteActiveUser;