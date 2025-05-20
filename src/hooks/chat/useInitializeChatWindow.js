const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");
const { default: useToast } = require("../common/useToast");

const useInitializeChatWindow = (projectId) => {
    const toastId = 'initialize_chatWindow';
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const initializeChatWindow =async (projectId) => {
        setLoading(true);
        setError(null);
        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-chat-room/${projectId}`,
            method:"POST",
        });
        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:res?.error?.message || "Something went wrong."});
            return;
        }
        setLoading(false);
        console.log("::res in chat",res);
    } 

    useEffect(()=>{
       initializeChatWindow(projectId);
    },[projectId]);
    
    return {loadingInitializeChatWindow:loading,errorInitializeChatWindow:error,initializeChatWindow}

}
export default useInitializeChatWindow;