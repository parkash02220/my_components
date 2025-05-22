import { useAppContext } from "../App/AppContext";

export const formatInitializeChatWindow = (payload) => {
    const formattedPayload = {...payload,groups:payload?.chatRooms || {}};
    
   delete formattedPayload?.chatRooms;
   return formattedPayload;
}

export const formatAllMessages = (payload) => {
    console.log("::payload",payload)
    const {activeUser} = useAppContext().state;
    const {page,messages=[],totalMessages} = payload;
    const hasMore = (page * 20) < totalMessages;
    const updatedMessages = messages?.map((msg)=>{
        return {
            ...msg,
            isSentMessage : msg?.sender?.id === activeUser?.id,
        }
    })
    return {
        page,
        messages:updatedMessages,
        totalMessages,
        hasMore,
        pageSize:20,
    } 
}

export const formatAddMessageInUserMsgs = (payload) => {
    const {activeUser} = useAppContext().state;
    const time = new Date().toISOString();
    let message = {
          text:payload,
          sender:activeUser,
          isSentMessage:true,
          createdAt:time,
    }
    return message;
}