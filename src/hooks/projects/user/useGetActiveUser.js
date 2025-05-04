import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import * as actions from '@/context/action';
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetActiveUser = () => {
    const {dispatch,state} = useAppContext();
    const {activeUser,loading,error} = state;
    const {loadingActiveUser} = loading;
    const {errorActiveUser} = error;
    const toastId = "active_user";
    const fetchActiveUser = async () => {
        dispatch({type:actions.SET_ACTIVE_USER_REQUEST});
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-user`,
                method:"GET",
            });
    
            if(res.error){
                dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE,payload:res.error});
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