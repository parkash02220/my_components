"use client";
import { useState } from "react";
import useSendMessage from "@/hooks/chat/useSendMessage";
import useCreateChatRoom from "@/hooks/chat/useCreateChatRoom";
import useCreateCustomGroup from "@/hooks/chat/useCreateCustomGroup";

export default function useChatHandlers() {
  const {
    message,
    handleMessageChange,
    sendMessage,
    setMessage,
    clearInput
  } = useSendMessage();

  const { createChatRoom } = useCreateChatRoom();
  const { createCustomGroup } = useCreateCustomGroup();

  return {
    message,
    handleMessageChange,
    sendMessage,
    setMessage,
    clearInput,
    createChatRoom,
    createCustomGroup
  };
}
