import { useAppContext } from "@/context/AppContext";
import useToast from "../common/useToast";
import { useState } from "react";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/action';
const useReadNotification = () => {
     const toastId = "read_notification";
     const {showToast} = useToast();
     const {state,dispatch} = useAppContext();
     const [loadingReadNotification,setLoadingReadNotification] = useState(false);
     const [errorReadNotification,setErrorReadNotification] = useState(null);
     const markNotificationAsRead = async (notificationId) => {
            setLoadingReadNotification(true);
            setErrorReadNotification(null);
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/update-notification-seen-status/${notificationId}`,
                method:"PATCH",
            });

            setLoadingReadNotification(false);
            if(res.error){
                setErrorReadNotification(res.error);
                showToast({toastId,type:"error",message:"Failed to mark notification as read. Please try again"});
                return;
            }

            console.log("::res in use read notification",res);
            dispatch({type:actions.MARK_NOTIFICATION_AS_READ,payload:{notificationId}})
            showToast({toastId,type:"success",message:res?.data?.message || "Notification marked as read successfully."})
     }

     return {loadingReadNotification,errorReadNotification,markNotificationAsRead};
}
export default useReadNotification;