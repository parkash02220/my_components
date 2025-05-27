import { useAppContext } from "../App/AppContext";

export const formatInitializeChatWindow = (payload, activeUserId) => {
  const chatRooms = payload?.chatRooms || [];
  const usersList = payload?.users || [];
  const uniqueChatRooms = Array.from(
    new Map(
      chatRooms?.map(chatroom => [chatroom.id,{
        ...chatroom,
      }])
    ).values()
  );
  const groups = uniqueChatRooms.filter(chatroom => chatroom?.isGroup);
  const existingDms = uniqueChatRooms.filter(chatroom => !chatroom?.isGroup);

  const userIdToChatId = {};
  existingDms.forEach(chat => {
    const otherUser = chat.participants.find(
      participant => participant.id !== activeUserId
    );
  
    if (otherUser) {
      userIdToChatId[otherUser.id] = chat.id;
    } else {
      console.warn(`:::No other user found for chat ${chat.id}`);
    }
  });


  const users = Array.from(
    new Map(
      usersList.map(user => [
        user.id,
        {
          ...user,
          chatId: userIdToChatId[user.id] || null,
        },
      ])
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
