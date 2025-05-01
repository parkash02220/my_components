import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import * as actions from '@/context/action';
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetActiveUser = () => {
    const {dispatch} = useAppContext();
    
    const fetchActiveUser = async () => {
        dispatch({type:actions.SET_ACTIVE_USER_REQUEST});
        try {
            const res = await ApiCall({
                url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-user`,
                method:"GET",
            });
    
            if(res.error){
                dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE,payload:res.error});
                return;
            }
    
            const formattedIdResponse = convertIdFields(res?.data?.user || {});
            dispatch({type:actions.SET_ACTIVE_USER_SUCCESS,payload:formattedIdResponse});
        } catch (error) {
            dispatch({type:actions.SET_ACTIVE_PROJECT_FAILURE,payload:error});
        }
    }
    useEffect(()=>{
        fetchActiveUser();
    },[])
    return {fetchActiveUser};
}

export default useGetActiveUser;