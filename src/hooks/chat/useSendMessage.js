const { useChatContext } = require("@/context/Chat/ChatContext");
const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");
const { default: useToast } = require("../common/useToast");
import * as actions from '@/context/Chat/action';


const useSendMessage = () => {
    const toastId = "send_message";
    const {showToast} = useToast();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [message,setMessage] = useState("");
    const {state,dispatch} = useChatContext();
    const {chatRoom} = state;
    const handleMessageChange = (e) => {
        const newMessage = e?.target?.value;
        setMessage(newMessage);

    }

    const handleKeyDown =(e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    const sendMessage = async () => {
        if(!message?.trim() || !chatRoom?.id) return;
        const msgToSend = message;
        setMessage("");
        dispatch({type:actions.ADD_MESSSAGE_IN_USER_MESSAGES,payload:msgToSend});
        setLoading(true);
        setError(null);

        const res = await ApiCall({
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/send-message`,
            method:"POST",
            body:{
                chatRoomId:chatRoom?.id,
                content:msgToSend,
            }
        });

        if(res.error){
            setLoading(false);
            setError(res.error);
            showToast({toastId,type:"error",message:"Failed to send message. Please refresh the page."});
            return;
        }

        setLoading(false);
        console.log("::res in send mesage",res?.data);
    }

     
    return {loadingMessageSend:loading,errorMessageSend:error,sendMessage,handleMessageChange,message,handleKeyDown};
}

export default useSendMessage;