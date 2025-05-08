import { useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useAppContext } from "@/context/AppContext";
import * as actions from '@/context/action';
const useMarkAllNotificationAsRead = () => {
    const toastId = 'mark_all_notification_as_read';
    const {showToast} = useToast();
    const [loadingMarkAllAsRead,setLoadingMarkAllAsRead] = useState(false);
    const [errorMarkAllAsRead,setErrorMarkAllAsRead] = useState(null);
    const {dispatch} = useAppContext();
    const markAllNotificationsAsRead = async () => {
        dispatch({type:actions.MARK_ALL_NOTIFICATION_AS_READ});
        setLoadingMarkAllAsRead(true);
        setErrorMarkAllAsRead(null);

        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/mark-all-read`,
            method:'PUT',
        });

        setLoadingMarkAllAsRead(false);
        if(res.error){
            showToast({toastId,type:"error",message:"Failed to mark all notifications as read, Please refresh the page"});
            setErrorMarkAllAsRead(res.error);
            return;
        }
        console.log("::res in all mark read",res)
        showToast({toastId,type:"success",message:"Changes saved and synced with the server."});
        
    }
    return {loadingMarkAllAsRead,errorMarkAllAsRead,markAllNotificationsAsRead};
}
export default useMarkAllNotificationAsRead;