import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import * as actions from '@/context/action';
import useToast from "@/hooks/common/useToast";
import { useRouter } from "next/navigation";
import useLogout from "./useLogout";
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetActiveUser = () => {
    const {dispatch,state} = useAppContext();
    const {activeUser,loading,error} = state;
    const {loadingActiveUser} = loading;
    const {errorActiveUser} = error;
    const toastId = "active_user";
    const {showToast} = useToast();
    const {loadingLogout,logoutUser} = useLogout();
    const fetchActiveUser = async () => {
        dispatch({type:actions.SET_ACTIVE_USER_REQUEST});
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-user`,
                method:"GET",
            });
    
            if(res.error){
                const {error} = res;
                showToast({toastId,type:"error",message:error?.message || "Something went wrong"});
                dispatch({type:actions.SET_ACTIVE_USER_FAILURE,payload:error});
                logoutUser();
                return;
            }
            const formattedIdResponse = convertIdFields(res?.data?.user || {});
            dispatch({type:actions.SET_ACTIVE_USER_SUCCESS,payload:formattedIdResponse})
    }
    useEffect(()=>{
        fetchActiveUser();
    },[])
    return {activeUser,loadingActiveUser,errorActiveUser,fetchActiveUser};
}

export default useGetActiveUser;