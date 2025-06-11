import { useEffect, useRef, useState } from "react";
import useToast from "../common/useToast";
import { ApiCall } from "@/utils/ApiCall";
import { useNotificationContext } from "@/context/Notifications/NotificationsContext";
import * as actions from '@/context/Notifications/action';
const useGetNotificationCount = () => {
    const toastId = "notification_unread_count";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const hasInitialFetchDone = useRef(false);
    const {dispatch} = useNotificationContext();
    const getUnreadCountOfNotification = async () => {
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/notification-count`,
            method:"GET",
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Error while fetching unread count of notifications"});
        }
        setLoading(false);
        const {unreadCount,totalCount} = res?.data;
        dispatch({type:actions.SET_NOTIFICATIONS_COUNT,payload:{unreadCount,totalCount}})
    }

    useEffect(()=>{
     if(!hasInitialFetchDone.current){
        getUnreadCountOfNotification();
        hasInitialFetchDone.current = true;
     }
    },[]);
   return {loading,error,getUnreadCountOfNotification}
}
export default useGetNotificationCount;