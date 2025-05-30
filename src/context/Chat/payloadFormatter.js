import { useAppContext } from "../App/AppContext";

export const formatInitializeChatWindow = (payload, activeUserId) => {
  const chatRooms = payload?.chatRooms || [];
  const usersList = payload?.users || [];

  const updatedChatRooms = chatRooms.map((chatroom) => {
    const lastMessage = chatroom.lastMessage
      ? {
          ...chatroom.lastMessage,
          isSentByActiveUser: chatroom.lastMessage?.sender?.id === activeUserId,
          isSeenByActiveUser:
            chatroom.lastMessage?.readBy?.includes(activeUserId),
        }
      : null;

    const targetUser = !chatroom?.isGroup
      ? chatroom.participants?.find((user) => user.id !== activeUserId)
      : null;

    return {
      ...chatroom,
      targetUser,
      lastMessage,
    };
  });

  const chatRoomsByIds = {};
  const chatRoomIds = [];

  updatedChatRooms.forEach((chatroom) => {
    chatRoomsByIds[chatroom.id] = chatroom;
    chatRoomIds.push(chatroom.id);
  });

  const directChatParticipantIds = new Set(
    updatedChatRooms
      .filter((room) => !room.isGroup)
      .flatMap((room) => room.participants?.map((user) => user.id) || [])
  );

  const usersInChat = {};
  const usersInChatIds = [];

  const usersNotInChat = {};
  const usersNotInChatIds = [];

  usersList.forEach((user) => {
    if (directChatParticipantIds.has(user.id)) {
      usersInChat[user.id] = user;
      usersInChatIds.push(user.id);
    } else {
      usersNotInChat[user.id] = user;
      usersNotInChatIds.push(user.id);
    }
  });

  const formattedPayload = {
    chatWindow: {
      allUsers: {
        byIds: { ...usersInChat, ...usersNotInChat },
        allIds: [...new Set([...usersInChatIds, ...usersNotInChatIds])],
      },
      usersWithoutChatRoom: {
        byIds: usersNotInChat,
        allIds: [...new Set(usersNotInChatIds)],
      },
      usersWithChatRoom: {
        byIds: usersInChat,
        allIds: [...new Set(usersInChatIds)],
      },
      chatRooms: {
        byIds: chatRoomsByIds,
        allIds: chatRoomIds,
      },
    },
  };
  return formattedPayload.chatWindow;
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