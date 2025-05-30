import { useChatContext } from "@/context/Chat/ChatContext";
import useToast from "../common/useToast";
import { useAppContext } from "@/context/App/AppContext";
import { useInView } from "react-intersection-observer";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields } from "@/utils";
import { useEffect } from "react";
import * as actions from "@/context/Chat/action";
const useGetAllMessages = (selectedDirectoryItem = {}) => {
  const toastId = "get__messages";
  const { showToast } = useToast();
  const { dispatch, state } = useChatContext();
  const { activeUser } = useAppContext().state;
  const { ref: loadMoreRef, inView } = useInView();

  const { allChatMessages } = state;
  const chatDetails = allChatMessages[selectedDirectoryItem?.id];
  const {
    messages = [],
    loading = false,
    error = null,
    page = 0,
    pageSize = 20,
    hasMore = false,
  } = chatDetails || {};

  const fetchMessages = async (chatRoomId, pageToFetch = page + 1) => {
    dispatch({
      type: actions.SET_CHAT_MESSAGES_REQUEST,
      payload: { chatRoomId, page: pageToFetch - 1 },
    });

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-messages?chatRoomId=${chatRoomId}&page=${pageToFetch}`,
      method: "GET",
    });

    if (res.error) {
      dispatch({
        type: actions.SET_CHAT_MESSAGES_ERROR,
        payload: { chatRoomId },
      });
      showToast({
        toastId,
        type: "error",
        message:
          res?.error?.message || "Something went wrong while loading messages.",
      });
      return;
    }

    const formattedIdResponse = convertIdFields(res?.data);
    dispatch({
      type: actions.SET_CHAT_MESSAGES_SUCCESS,
      payload: {
        chatRoomId,
        chatMessagesData: formattedIdResponse,
        activeUser,
      },
    });
  };

  useEffect(() => {
    if (
      selectedDirectoryItem?.id &&
      inView &&
      hasMore &&
      !loading &&
      messages.length > 0
    ) {
      fetchMessages(selectedDirectoryItem.id);
    }
  }, [inView, hasMore, loading, selectedDirectoryItem?.id]);

  const initMessages = async (chatRoomId) => {
    await fetchMessages(chatRoomId, 1);
  };

  return {
    initMessages,
    loadMoreRef,
    messages,
    loading: page === 0 && loading,
    loadingMore: page > 0 && loading,
    error,
    pageSize,
    hasMore,
  };
};
export default useGetAllMessages;
