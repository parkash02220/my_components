const { useChatContext } = require("@/context/Chat/ChatContext");
const { useState } = require("react");
const { default: useGetAllMessages } = require("../useGetAllMessages");
import * as actions from '@/context/Chat/action';
const useStartGroupChat = () => {
    const [loading,setLoading] = useState(false);
    const {dispatch} = useChatContext();
    const {getAllMessages} = useGetAllMessages();
    const startGroupChat = async (chatroom) => {
        setLoading(true);
        dispatch({type:actions.SET_CHAT_ROOM,payload:chatroom})
        await getAllMessages(chatroom?.id,true);
        setLoading(false);

    } 

    return {loadingStartGroupChat:loading,startGroupChat};
}
export default useStartGroupChat;