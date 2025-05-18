import { useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/Notifications/action';
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";
import { useAppContext } from "@/context/App/AppContext";
const useMarkAllNotificationAsRead = () => {
    const {activeUser} = useAppContext()?.state;
    const {dispatch} = useNotificationContext();
    const toastId = 'mark_all_notification_as_read';
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const markAllNotificationsAsRead = async () => {
        dispatch({type:actions.MARK_ALL_NOTIFICATION_AS_READ,payload:{user:activeUser}});
        setLoading(true);
        setError(null);

        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/mark-all-read`,
            method:'PUT',
        });

        if(res.error){
            setLoading(false);
            showToast({toastId,type:"error",message:"Failed to mark all notifications as read, Please refresh the page"});
            setError(res.error);
            return;
        }
        setLoading(false);
        showToast({toastId,type:"success",message:"Changes saved and synced with the server."});
        
    }
    return {loadingMarkAllAsRead:loading,errorMarkAllAsRead:error,markAllNotificationsAsRead};
}
export default useMarkAllNotificationAsRead;