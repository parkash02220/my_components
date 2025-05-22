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
        const formattedPayload = formatInitializeChatWindow(payload);
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
        console.log("::SET_USER_MESSAGES_SUCCESS",payload)
        const formattedPayload = formatAllMessages(payload);
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
        const message = formatAddMessageInUserMsgs(payload);
        return {
            ...state,
            singleUserChat:{
                ...state?.singleUserChat,
                messages:[...state?.singleUserChat?.messages,message],
                totalMessages: state?.singleUserChat.totalMessages + 1,
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