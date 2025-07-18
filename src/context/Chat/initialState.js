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
        page:0,
        pageSize:10,
        totalChatroomsAndUsers:0,
        hasMore:false,
    },
    loadingChatWindow:false,
    errorChatWindow:null,
    activeChatRoomId:null,
    activeChatRoom:null,
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