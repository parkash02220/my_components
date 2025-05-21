import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState";
import * as actions from './action';
import { formatInitializeChatWindow } from "./payloadFormatter";
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