import { useAppContext } from "@/context/AppContext";
import * as actions from '@/context/action';
import { ApiCall } from "@/utils/ApiCall";
import useToast from "./useToast";
import { useEffect } from "react";
import { convertIdFields } from "@/utils";
const useNotifications = (open) => {
    const toastId = "get_notification";
    const {showToast} = useToast();
    const {dispatch,state} = useAppContext();
    const {notifications,loading,error} = state;
    const {loadingNotifications} = loading;
    const {errorNotifications} = error;
    const fetchNotifications = async () => {
        dispatch({type:actions.SET_NOTIFICATIONS_REQUEST});
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-notifications?unseen=${notifications?.tab === "unread" ? true:false}`,
            method:"GET",
        });

        if(res.error){
             showToast({toastId,type:"error",message:"Failed to load notifications. Please reload page."});
             dispatch({type:actions.SET_NOTIFICATIONS_FAILURE});
             return;
        }
        const formattedIdResponse = convertIdFields(res?.data?.notifications || []);
        dispatch({type:actions.SET_NOTIFICATIONS_SUCCESS,payload:{
            notifications:formattedIdResponse,
            hasMore:false,
        }})

    }

    useEffect(()=>{
        if(open){
            fetchNotifications();
        }
    },[open,notifications?.tab]);

    return {
        notifications:notifications[notifications?.tab],
        loadingNotifications,
        errorNotifications,
        fetchNotifications
    }

}

export default useNotifications;
