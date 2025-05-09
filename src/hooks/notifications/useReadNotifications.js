import { useAppContext } from "@/context/AppContext";
import useToast from "../common/useToast";
import { useState } from "react";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/action';
import { convertIdFields } from "@/utils";
const useReadNotification = () => {
     const toastId = "read_notification";
     const {showToast} = useToast();
     const {state,dispatch} = useAppContext();
     const user = state?.activeUser;
     const [loadingReadNotification,setLoadingReadNotification] = useState(false);
     const [errorReadNotification,setErrorReadNotification] = useState(null);
     const markNotificationAsRead = async (notificationId) => {
         dispatch({type:actions.MARK_NOTIFICATION_AS_READ,payload:{notificationId,user}});
            setLoadingReadNotification(true);
            setErrorReadNotification(null);
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/update-notification-seen-status/${notificationId}`,
                method:"PATCH",
            });

            setLoadingReadNotification(false);
            if(res.error){
                setErrorReadNotification(res.error);
                showToast({toastId,type:"error",message:"Failed to mark notification as read. Please refresh the page."});
                return;
            }
            showToast({toastId,type:"success",message:"Changes saved and synced with the server."})
     }

     return {loadingReadNotification,errorReadNotification,markNotificationAsRead};
}
export default useReadNotification;