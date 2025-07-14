"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as actions from "@/context/Chat/action";
import { useChatContext } from "@/context/Chat/ChatContext";
import useApiCallState from "../common/useApiCallState";

export default function useManageActiveChatRoom(
  allChatRooms,
  joinRoom,
  markAllMsgAsRead,
  initMessages
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state, dispatch } = useChatContext();
  const { activeChatRoom } = state;
  const {
    status,
    error,
    loading,
    startLoading,
    setSuccess,
    setFailure,
    reset,
  } = useApiCallState();
  
  const chatRoomId = searchParams.get("chatRoomId");
  const lastChatRoomIdRef = useRef(null);
  const abortControllerRef = useRef(null);
  useEffect(() => {
    if (!chatRoomId) {
      dispatch({ type: actions.CLEAR_ACTIVE_CHAT_ROOM });
      setFailure("Chat room not found");
      return;
    }

    if (chatRoomId === lastChatRoomIdRef.current) return;

    const foundRoom = allChatRooms?.find((room) => room.id === chatRoomId);
    if (!foundRoom) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    lastChatRoomIdRef.current = chatRoomId;
    startLoading();
    dispatch({ type: actions.SET_ACTIVE_CHAT_ROOM, payload: foundRoom });

    joinRoom(chatRoomId);
    markAllMsgAsRead(chatRoomId);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    initMessages(chatRoomId, { signal: controller.signal })
      .then(() => setSuccess())
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("initMessages aborted for chatRoomId:", chatRoomId);
        } else {
          console.error("initMessages failed:", error);
          setFailure(error.message || "Failed to load messages");
        }
      });
  }, [
    chatRoomId,
    allChatRooms,
    dispatch,
    joinRoom,
    markAllMsgAsRead,
    initMessages,
    startLoading,
    setSuccess,
    setFailure,
    reset,
  ]);

  const removeActiveChatRoom = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("chatRoomId");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    dispatch({ type: actions.CLEAR_ACTIVE_CHAT_ROOM });
    lastChatRoomIdRef.current = null;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setFailure("");
  }, [searchParams, pathname, router, dispatch, setFailure]);
  return {
    activeChatRoom,
    status,
    error,
    loading,
    removeActiveChatRoom,
    startLoading,
    setSuccess,
    setFailure,
    reset,
  };
}
