import useToast from "@/hooks/common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";

const useDeleteUser = () => {
  const toastId = "delete_user";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteUser = async (users = [], isDeleteAll = false,getUpdatedUsers) => {
    showToast({ toastId, type: "loading", message: "Deleting user..." });
    setLoading(true);
    setError(null);
    const userIds = !isDeleteAll ? users?.map((user)=> user?.id) : [];
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/delete-user?isDeleteAll=${isDeleteAll}`,
      method: "DELETE",
      body: {
        userIds,
      },
    });
   
    if(res.error){
       setLoading(false);
        showToast({toastId,type:"error",message:res?.error?.message || "Failed to delete user. Please try again."});
        setError(res?.error?.message || "something went wrong");
        return;
    }
     setLoading(false);
      await getUpdatedUsers();
      showToast({toastId,type:"success",message:res?.data?.message || "User deleted successfully."})
  };
  return {
    loadingDeleteUser:loading,
    errorDeleteUser:error,
    deleteUser,
  }
};
export default useDeleteUser;
