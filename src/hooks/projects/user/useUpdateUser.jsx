const { default: useToast } = require("@/hooks/common/useToast");
const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react")

const useUpdateUser = () => {
    const toastId = 'update_user';
    const {showToast} = useToast();
    const [loadingUpdateUser,setLoadingUpdateUser] = useState(false);
    const [errorUpdateUser,setErrorUpdateUser] = useState(null);
    const updateUser = async (userDetails,userId) => {
        showToast({toastId,type:"loading",message:"Updating user..."});
        setLoadingUpdateUser(true);
        setErrorUpdateUser(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/update-user/${userId}`,
            method:"PUT",
            body:userDetails,
        });
        setLoadingUpdateUser(false);
        if(res.error){
            setErrorUpdateUser(res.error.message || "something went wrong");
            showToast({toastId,type:"error",message:"Failed to update user details. Please refresh the page"});
            return;
        }
         
        console.log("::updates user",res?.data);
        showToast({toastId,type:"success",message:"User updted successfully."});


    }

    return {loadingUpdateUser,errorUpdateUser,updateUser};
}
export default useUpdateUser;