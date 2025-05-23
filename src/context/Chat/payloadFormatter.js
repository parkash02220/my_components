import { useAppContext } from "../App/AppContext";

export const formatInitializeChatWindow = (payload) => {
  const groups = (payload?.chatRooms || []).filter(
    (chatroom) => chatroom?.isGroup
  );
  const users = Array.from(
    new Map((payload?.users || []).map(user => [user.id, user])).values()
  );
  const formattedPayload = { ...payload, groups,users };
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
