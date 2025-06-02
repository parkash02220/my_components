import { useAppContext } from "../App/AppContext";
const mergeIds = (existing = [], incoming = []) => [...new Set([...existing, ...incoming])];
const mergeByIds = (existing = {}, incoming = {}) => ({ ...existing, ...incoming });


export const formatChatroomsAndUsers = (payload, activeUserId,prevChatWindow = null) => {
  const chatRooms = payload?.chatRooms || [];
  const usersList = payload?.users || [];
  const { page, limit, totalChatRooms, totalUsers } = payload?.meta;
  const totalChatroomsAndUsers = totalChatRooms + totalUsers;
  const hasMore = page * limit < totalChatroomsAndUsers;
  
  const updatedChatRooms = chatRooms.map(chatroom => {
    const lastMessage = chatroom.lastMessage
      ? {
          ...chatroom.lastMessage,
          isSentByActiveUser: chatroom.lastMessage?.sender?.id === activeUserId,
          isSeenByActiveUser: chatroom.lastMessage?.readBy?.includes(activeUserId),
        }
      : null;
  
    const targetUser = !chatroom.isGroup
      ? chatroom.participants?.find((u) => u.id !== activeUserId)
      : null;
  
    return {
      ...chatroom,
      targetUser,
      lastMessage,
    };
  });
  

  const chatRoomsByIds = {};
  const chatRoomIds = [];
  updatedChatRooms.forEach(chatroom => {
    chatRoomsByIds[chatroom.id] = chatroom;
    chatRoomIds.push(chatroom.id);
  });
  
  const directChatParticipantIds = new Set(
    updatedChatRooms
      .filter(room => !room.isGroup)
      .flatMap(room => room.participants?.map(user => user.id) || [])
  );
  
  const usersInChat = {};
  const usersInChatIds = [];
  const usersNotInChat = {};
  const usersNotInChatIds = [];
  
  usersList.forEach(user => {
    if (directChatParticipantIds.has(user.id)) {
      usersInChat[user.id] = user;
      usersInChatIds.push(user.id);
    } else {
      usersNotInChat[user.id] = user;
      usersNotInChatIds.push(user.id);
    }
  });
  

  const formattedPayload = {
    chatRooms: {
      byIds: prevChatWindow
        ? mergeByIds(prevChatWindow.chatRooms?.byIds, chatRoomsByIds)
        : chatRoomsByIds,
      allIds: prevChatWindow
        ? mergeIds(prevChatWindow.chatRooms?.allIds, chatRoomIds)
        : chatRoomIds,
    },
    allUsers: {
      byIds: prevChatWindow
        ? mergeByIds(prevChatWindow.allUsers?.byIds, { ...usersInChat, ...usersNotInChat })
        : { ...usersInChat, ...usersNotInChat },
      allIds: prevChatWindow
        ? mergeIds(prevChatWindow.allUsers?.allIds, [...usersInChatIds, ...usersNotInChatIds])
        : [...usersInChatIds, ...usersNotInChatIds],
    },
    usersWithChatRoom: {
      byIds: prevChatWindow
        ? mergeByIds(prevChatWindow.usersWithChatRoom?.byIds, usersInChat)
        : usersInChat,
      allIds: prevChatWindow
        ? mergeIds(prevChatWindow.usersWithChatRoom?.allIds, usersInChatIds)
        : usersInChatIds,
    },
    usersWithoutChatRoom: {
      byIds: prevChatWindow
        ? mergeByIds(prevChatWindow.usersWithoutChatRoom?.byIds, usersNotInChat)
        : usersNotInChat,
      allIds: prevChatWindow
        ? mergeIds(prevChatWindow.usersWithoutChatRoom?.allIds, usersNotInChatIds)
        : usersNotInChatIds,
    },
    page,
    pageSize: limit,
    totalChatRooms,
    totalUsers,
    totalChatroomsAndUsers,
    hasMore,
  };
  return formattedPayload;
  
};

export const formatAllMessages = (payload, activeUser) => {
  const { page, messages = [], totalMessages } = payload;
  const pageSize = 20;
  const hasMore = page * pageSize < totalMessages;
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
    pageSize,
  };
};

export const formatAddMessageInCHatMessages = (payload, activeUser) => {
  const time = new Date().toISOString();
  let message = {
    text: payload,
    sender: activeUser,
    isSentMessage: true,
    createdAt: time,
  };
  return message;
};

export const formatNewChatRoomPayload = (chatRoom,activeUser) => {
  let updatedChatRoom = chatRoom;
  if(!chatRoom?.isGroup){
    updatedChatRoom.targetUser = chatRoom.participants?.find((user) => user.id !== activeUser?.id);
  }
   return updatedChatRoom;
}

export const formatLastMessage = (message, activeUserId) => {
  return {
    ...message,
    isSentByActiveUser: message?.sender?.id === activeUserId,
    isSeenByActiveUser: message?.readBy?.includes(activeUserId),
  };
};