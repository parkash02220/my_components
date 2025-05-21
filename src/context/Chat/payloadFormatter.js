export const formatInitializeChatWindow = (payload) => {
    const formattedPayload = {...payload,groups:payload?.chatRooms || {}};
    
   delete formattedPayload?.chatRooms;
   return formattedPayload;
}