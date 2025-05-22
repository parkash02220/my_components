export const initialState = {
    chatWindow:{
        users:[],
        groups:[],
    },
    loadingChatWindow:false,
    errorChatWindow:null,
    chatRoom:{},
    singleUserChat:{
        page:0,
        pageSize:20,
        totalMessages:0,
        messages:[],
        hasMore:false,
    },
    loadingSingleUserChat:false,
    errorSingleUserChat:null,
}