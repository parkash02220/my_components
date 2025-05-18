import { useAppContext } from "@/context/App/AppContext";
import useToast from "../common/useToast";
import { useState } from "react";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/Notifications/action';
import { convertIdFields } from "@/utils";
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";
const useReadNotification = () => {
     const toastId = "read_notification";
     const {showToast} = useToast();
     const {state} = useAppContext();
     const {dispatch} = useNotificationContext();
     const user = state?.activeUser;
     const [loading,setLoading] = useState(false);
     const [error,setError] = useState(null);
     const markNotificationAsRead = async (notificationId) => {
         dispatch({type:actions.MARK_NOTIFICATION_AS_READ,payload:{notificationId,user}});
            setLoading(true);
            setError(null);
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/update-notification-seen-status/${notificationId}`,
                method:"PATCH",
            });

            if(res.error){
                setLoading(false);
                setError(res.error);
                showToast({toastId,type:"error",message:"Failed to mark notification as read. Please refresh the page."});
                return;
            }
            setLoading(false);
            showToast({toastId,type:"success",message:"Changes saved and synced with the server."})
     }

     return {loadingReadNotification:loading,errorReadNotification:error,markNotificationAsRead};
}
export default useReadNotification;