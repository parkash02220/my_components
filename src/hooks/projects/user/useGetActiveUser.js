import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react")

const useGetActiveUser = () => {
    const {dispatch} = useAppContext();
    const [loadingActiveUser,setLoadingActiveUser] = useState(false);
    const [errorActiveUser,setErrorActiveUser] = useState(false);
    
    const fetchActiveUser = async () => {
        setLoadingActiveUser(true);
        setErrorActiveUser(false);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/get-user`,
            method:"GET",
        });

        setLoadingActiveUser(false);
        if(res.error){
            console.log("::error while getting active user",res);
            setErrorActiveUser(true);
            return;
        }

        const formattedIdResponse = convertIdFields(res?.data?.user || {});
        dispatch({type:"SET_ACTIVE_USER",payload:formattedIdResponse});
    }
    useEffect(()=>{
        fetchActiveUser();
    },[])
    return {loadingActiveUser,errorActiveUser,fetchActiveUser};
}

export default useGetActiveUser;