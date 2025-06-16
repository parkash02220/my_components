import { useCallback, useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/Notifications/action';
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";
const useClearNotifications = () => {
    const toastId = "clear_notification";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
     const {dispatch} = useNotificationContext();
    const clearNotification = useCallback(async () => {
        setLoading(true);
        setError(null);
        dispatch({type:actions.CLEAR_NOTIFICATIONS});
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/clear-notifications`,
            method:"DELETE",
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Error while deleting notifications Please refresh the page."});
            return;
        }

        setLoading(false);

    },[]); 

    return {loading,error,clearNotification};

}
export default useClearNotifications;