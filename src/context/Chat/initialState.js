export const initialState = {
    chatWindow:{
        allUsers:{
            byIds:{},
            allIds:[],
        },
        usersWithoutChatRoom:{
            byIds:{},
            allIds:[],
        },
        usersWithChatRoom:{
            byIds:{},
            allIds:[],
        },
        chatRooms:{
            byIds:{},
            allIds:[],
        },
    },
    loadingChatWindow:false,
    errorChatWindow:null,
    activeChatRoomId:null,
    activeChatRoom:{},
    allChatMessages:{},
    // groupChat:{
    //     page:0,
    //     pageSize:20,
    //     totalMessages:0,
    //     messages:[],
    //     hasMore:false,
    // },
    onlineUsers:[],
    typingUsers:[],
}