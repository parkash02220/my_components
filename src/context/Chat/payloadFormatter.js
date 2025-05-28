import { useAppContext } from "../App/AppContext";

export const formatInitializeChatWindow = (payload, activeUserId) => {
  const chatRooms = payload?.chatRooms || [];
  const usersList = payload?.users || [];

  const uniqueChatRooms = Array.from(
    new Map(
      chatRooms.map(chatroom => {
        const { lastMessage } = chatroom;
        return [
          chatroom.id,
          {
            ...chatroom,
            lastMessage: lastMessage
              ? {
                  ...lastMessage,
                  isSentByActiveUser: lastMessage?.sender?.id === activeUserId,
                  isSeenByActiveUser: lastMessage?.readBy?.some((id)=> id === activeUserId),
                }
              : null,
          },
        ];
      })
    ).values()
  );

  const groups = uniqueChatRooms.filter(chatroom => chatroom?.isGroup);
  const existingDms = uniqueChatRooms.filter(chatroom => !chatroom?.isGroup);


  const userIdToChatInfo = {};
  existingDms.forEach(chat => {
    const otherUser = chat.participants.find(
      participant => participant.id !== activeUserId
    );

    if (otherUser) {
      userIdToChatInfo[otherUser.id] = {
        chatId: chat.id,
        lastMessage: chat.lastMessage || null,
      };
    } else {
      console.warn(`:::No other user found for chat ${chat.id}`);
    }
  });

  const users = Array.from(
    new Map(
      usersList.map(user => {
        const chatInfo = userIdToChatInfo[user.id] || {};
        const lastMessage = chatInfo.lastMessage;
  
        return [
          user.id,
          {
            ...user,
            chatId: chatInfo.chatId || null,
            lastMessage: lastMessage
              ? {
                  ...lastMessage,
                  isSentByActiveUser: lastMessage?.sender?.id === activeUserId,
                  isSeenByActiveUser: lastMessage?.readBy?.some(id => id === activeUserId),
                }
              : null,
          },
        ];
      })
    ).values()
  );
  const formattedPayload = { ...payload, groups, users };
  return formattedPayload;
};



export const formatAllMessages = (payload, activeUser) => {
  const { page, messages = [], totalMessages } = payload;
  const hasMore = page * 20 < totalMessages;
  const updatedMessages = messages?.map((msg) => {
    return {
      ...msg,
      isSentMessage: msg?.sender?.id === activeUser?.id,
    };
  });
  return {
    page,
    messages: updatedMessages,
    totalMessages,
    hasMore,
    pageSize: 20,
  };
};

export const formatAddMessageInUserMsgs = (payload, activeUser) => {
    const time = new Date().toISOString();
  let message = {
    text: payload,
    sender: activeUser,
    isSentMessage: true,
    createdAt: time,
  };
  return message;
};
