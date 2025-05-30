import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState";
import * as actions from "./action";
import {
  formatAddMessageInCHatMessages,
  formatAllMessages,
  formatInitializeChatWindow,
  formatNewChatRoomPayload,
} from "./payloadFormatter";
const ChatContext = createContext();

function chatReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.INITIALIZE_CHAT_WINDOW_REQUEST: {
      return {
        ...state,
        loadingChatWindow: true,
        errorChatWindow: null,
      };
    }

    case actions.INITIALIZE_CHAT_WINDOW_SUCCESS: {
      const { data, activeUserId } = payload;
      const formattedPayload = formatInitializeChatWindow(data, activeUserId);
      return {
        ...state,
        chatWindow: formattedPayload || {},
        loadingChatWindow: false,
      };
    }

    case actions.INITIALIZE_CHAT_WINDOW_ERROR: {
      return {
        ...state,
        loadingChatWindow: false,
        errorChatWindow: payload,
      };
    }

    case actions.SET_ACTIVE_CHAT_ROOM: {
      return {
        ...state,
        activeChatRoomId: payload?.id,
        activeChatRoom: payload,
      };
    }

    case actions.SET_CHAT_MESSAGES_REQUEST: {
      const { chatRoomId,page } = payload;
      return {
        ...state,
        allChatMessages: {
          ...state.allChatMessages,
          [chatRoomId]: {
            ...(state.allChatMessages[chatRoomId] || {}),
            loading: true,
            error: null,
            page,
          },
        },
      };
    }
    case actions.SET_CHAT_MESSAGES_SUCCESS: {
      const { chatRoomId, chatMessagesData, activeUser } = payload;
      const formattedChatMessageData = formatAllMessages(
        chatMessagesData,
        activeUser
      );

      const existingMessages =
      state.allChatMessages[chatRoomId]?.messages || [];
  
    const mergedMessages =
      formattedChatMessageData.page === 1
        ? formattedChatMessageData.messages
        : [...formattedChatMessageData.messages, ...existingMessages];

        const uniqueMessages = Array.from(
          new Map(
            mergedMessages.map((msg) => [msg.id, msg])
          ).values()
        );

      return {
        ...state,
        allChatMessages: {
          ...state.allChatMessages,
          [chatRoomId]: {
            loading: false,
            error: null,
            ...formattedChatMessageData,
            messages: uniqueMessages,
          },
        },
      };
    }

    case actions.SET_CHAT_MESSAGES_ERROR: {
      const { chatRoomId, error } = payload;
      return {
        ...state,
        allChatMessages: {
          ...state.allChatMessages,
          [chatRoomId]: {
            ...(state.allChatMessages[chatRoomId] || {}),
            loading: false,
            error: error || "Failed to load messages.",
            messages: [],
          },
        },
      };
    }

    case actions.ADD_MESSSAGE_IN_CHAT_MESSAGES: {
      const { chatRoomId, data, activeUser } = payload;
      const message = formatAddMessageInCHatMessages(data, activeUser);
      return {
        ...state,
        allChatMessages: {
          ...state.allChatMessages,
          [chatRoomId]: {
            ...state.allChatMessages[chatRoomId],
            messages: [
              ...(state.allChatMessages[chatRoomId].messages || []),
              message,
            ],
            totalMessages:
              (state.allChatMessages[chatRoomId].totalMessages || 0) + 1,
          },
        },
      };
    }

    case actions.CREATE_NEW_CHAT_ROOM: {
      const { chatRoom, activeUser } = payload;
      const updatedChatRoom = formatNewChatRoomPayload(chatRoom, activeUser);
      const newState = { ...state };
    
      if (!newState.chatWindow.chatRooms.byIds[chatRoom.id]) {
        newState.chatWindow.chatRooms.byIds[chatRoom.id] = updatedChatRoom;
        newState.chatWindow.chatRooms.allIds.unshift(chatRoom.id);
      }
    
      if (!chatRoom?.isGroup && updatedChatRoom?.targetUser) {
        const targetUserId = updatedChatRoom.targetUser.id;
        const targetUserData =
          newState.chatWindow.usersWithoutChatRoom.byIds[targetUserId];
    
        if (targetUserData) {
          delete newState.chatWindow.usersWithoutChatRoom.byIds[targetUserId];
          newState.chatWindow.usersWithoutChatRoom.allIds =
            newState.chatWindow.usersWithoutChatRoom.allIds.filter(
              (id) => id !== targetUserId
            );
        }
    
        if (
          !newState.chatWindow.usersWithChatRoom.byIds[targetUserId] &&
          targetUserData
        ) {
          newState.chatWindow.usersWithChatRoom.byIds[targetUserId] =
            targetUserData;
        }
      }
    
      return newState;
    }
    

    case actions.SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: payload || [],
      };
    }

    case actions.ADD_NEW_MESSAGE_IN_CHAT: {
      const { newMessageData,activeUser } = payload;
      const { chatRoomId, message } = newMessageData;
      const isRoomExists = state.chatWindow.chatRooms?.allIds?.includes(chatRoomId);
      if(!isRoomExists) return state;
      const updatedMessage = message;
      updatedMessage.isSentMessage = message?.sender?.id === activeUser?.id;
          return {
            ...state,
            allChatMessages:{
              ...state.allChatMessages,
              [chatRoomId]:{
                ...state.allChatMessages[chatRoomId],
                messages:[...(state.allChatMessages[chatRoomId]?.messages || []),updatedMessage]
              }
            }
          }
    }

    case actions.ADD_USER_IN_TYPING_USERS: {
      const { user } = payload;
      if (!user) return state;
      return {
        ...state,
        typingUsers: [...new Set([...(state.typingUsers || []), user])],
      };
    }

    case actions.REMOVE_USER_IN_TYPING_USERS: {
      const { userId } = payload;
      return {
        ...state,
        typingUsers: state?.typingUsers?.filter((user) => user?.id !== userId),
      };
    }

    case actions.MARK_CHAT_AS_READ:{
      const { chatId, readerId } = payload;
      const chatRoom = state.chatWindow.chatRooms.byIds[chatId];
      
      if (!chatRoom || !chatRoom.lastMessage) return state; 
      const updatedLastMessage = {
        ...chatRoom.lastMessage,
        readBy: [...new Set([...(chatRoom.lastMessage.readBy || []), readerId])],
        isSeenByActiveUser:true,
      };
      
      return {
        ...state,
        chatWindow: {
          ...state.chatWindow,
          chatRooms: {
            ...state.chatWindow.chatRooms,
            byIds: {
              ...state.chatWindow.chatRooms.byIds,
              [chatId]: {
                ...chatRoom,
                lastMessage: updatedLastMessage,
              },
            },
          },
        },
      };

    }

    default:
      return state;
  }
}

export function ChatContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
