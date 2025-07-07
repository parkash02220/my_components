"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as actions from "@/context/Chat/action";
import { useChatContext } from "@/context/Chat/ChatContext";

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

  const chatRoomId = searchParams.get("chatRoomId");
  const lastChatRoomIdRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if(!chatRoomId){
      dispatch({ type: actions.CLEAR_ACTIVE_CHAT_ROOM });
      return;
    }
    if ( chatRoomId === lastChatRoomIdRef.current) return;

    const foundRoom = allChatRooms?.find((room) => room.id === chatRoomId);
    if (!foundRoom) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    lastChatRoomIdRef.current = chatRoomId;

    dispatch({ type: actions.SET_ACTIVE_CHAT_ROOM, payload: foundRoom });

    joinRoom(chatRoomId);
    markAllMsgAsRead(chatRoomId);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    initMessages(chatRoomId, { signal: controller.signal }).catch((error) => {
      if (error.name === "AbortError") {
        console.log("initMessages aborted for chatRoomId:", chatRoomId);
      } else {
        console.error("initMessages failed:", error);
      }
    });

  }, [
    chatRoomId,
    allChatRooms,
    dispatch,
    joinRoom,
    markAllMsgAsRead,
    initMessages
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
  }, [searchParams, pathname, router, dispatch]);

  return { activeChatRoom, removeActiveChatRoom };
}
