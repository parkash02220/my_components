import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState";
import * as actions from './action';
import { formatAddMessageInUserMsgs, formatAllMessages, formatInitializeChatWindow } from "./payloadFormatter";
const ChatContext = createContext();

function chatReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case actions.INITIALIZE_CHAT_WINDOW_REQUEST:{
        return {
            ...state,
            loadingChatWindow:true,
            errorChatWindow:null,
        }
    }
   
    case actions.INITIALIZE_CHAT_WINDOW_SUCCESS:{
        const {data,activeUserId} = payload;
        const formattedPayload = formatInitializeChatWindow(data,activeUserId);
        return {
            ...state,
            chatWindow:formattedPayload || {},
            loadingChatWindow:false,
        }
    }

    case actions.INITIALIZE_CHAT_WINDOW_ERROR:{
        return {
            ...state,
            loadingChatWindow:false,
            errorChatWindow:payload,
        }
    }

    case actions.SET_CHAT_ROOM :{
        return {
            ...state,
            chatRoom:payload,
        }
    }

    case actions.SET_USER_MESSAGES_REQUEST:{
        return {
            ...state,
            loadingSingleUserChat:true,
            errorSingleUserChat:null,
        }
    }
   
    case actions.SET_USER_MESSAGES_SUCCESS:{
        const {data,activeUser} = payload
        const formattedPayload = formatAllMessages(data,activeUser);
        return {
            ...state,
            singleUserChat:formattedPayload || {},
            loadingSingleUserChat:false,
        }
    }

    case actions.SET_USER_MESSAGES_ERROR:{
        return {
            ...state,
            loadingSingleUserChat:false,
            errorSingleUserChat:payload,
        }
    }

    case actions.ADD_MESSSAGE_IN_USER_MESSAGES:{
        const {data,activeUser} = payload
        const message = formatAddMessageInUserMsgs(data,activeUser);
        return {
            ...state,
            singleUserChat:{
                ...state?.singleUserChat,
                messages:[...state?.singleUserChat?.messages,message],
                totalMessages: state?.singleUserChat.totalMessages + 1,
            }
        }
    }

    case actions.SET_GROUP_MESSAGES_REQUEST:{
        return {
            ...state,
            loadingGroupChat:true,
            errorGroupChat:null,
        }
    }
   
    case actions.SET_GROUP_MESSAGES_SUCCESS:{
        const {data,activeUser} = payload
        const formattedPayload = formatAllMessages(data,activeUser);
        return {
            ...state,
            groupChat:formattedPayload || {},
            loadingGroupChat:false,
        }
    }

    case actions.SET_USER_MESSAGES_ERROR:{
        return {
            ...state,
            loadingGroupChat:false,
            errorGroupChat:payload,
        }
    }
   
    case actions.ADD_MESSSAGE_IN_GROUP_MESSAGES:{
        const {data,activeUser} = payload
        const message = formatAddMessageInUserMsgs(data,activeUser);
        return {
            ...state,
            groupChat:{
                ...state?.groupChat,
                messages:[...state?.groupChat?.messages,message],
                totalMessages: state?.groupChat.totalMessages + 1,
            }
        }
    }

    case actions.ADD_NEW_GROUP_IN_GROUPS:{
        return {
            ...state,
            chatWindow:{
                ...state.chatWindow,
                groups:[payload,...state.chatWindow.groups]
            }
        }
    }

    case actions.SET_ONLINE_USERS:{
        return{
            ...state,
            onlineUsers:payload || [],
        }
    }

    case actions.ADD_CHAT_ID_TO_USER:{
        const {userId,chatId} = payload;
        const updatedUsers = state.chatWindow.users.map((user)=>{
            if(user.id === userId){
                return {
                    ...user,
                    chatId,
                }
            }
            return user;
        });

        return {
            ...state,
            chatWindow:{
                ...state.chatWindow,
                users:updatedUsers,
            }
        }
    }
    
    default:
        return state;
  }
}

export function ChatContextProvider({children}){
    const [state,dispatch] = useReducer(chatReducer,initialState);

    return (
        <ChatContext.Provider value={{state,dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext);