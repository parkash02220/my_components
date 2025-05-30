import Loader from "@/components/Loader/Loader";
import { useChatContext } from "@/context/Chat/ChatContext";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
const RenderMessages = ({ selectedDirectoryItem }) => {
  const {
    getAllMessages,
    loadMoreRef,
    messages,
    loading,
    loadingMore,
    error,
    pageSize,
    hasMore,
  } = useGetAllMessages(selectedDirectoryItem);
  const bottomRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevMessagesLength = useRef(0);
  const preFirstMessage = useRef(null);
  useEffect(() => {
    if (messages.length === 0) return;

    if (isFirstLoad.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      isFirstLoad.current = false;
      preFirstMessage.current = messages[0];
    }

    if (messages.length > prevMessagesLength.current) {
      const isLoadedMoreMessages =
        preFirstMessage.current?.id !== messages[0]?.id;
      const newMessage = messages[messages.length - 1];
      const prevLastMessage = messages[messages.length - 2];

      const isNewer =
        !isLoadedMoreMessages &&
        (!prevLastMessage || newMessage.createdAt > prevLastMessage.createdAt);

      if (isNewer) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }

    prevMessagesLength.current = messages.length;
    preFirstMessage.current = messages[0];
  }, [messages]);

  useEffect(() => {
    isFirstLoad.current = true;
  }, [selectedDirectoryItem?.id]);

  if (loading) {
    return (
      <Box height={"100%"} position={"absolute"} width={"100%"}>
        <Loader />
      </Box>
    );
  }

  return (
    <>
      <Box>
        {loadingMore && (
          <Box textAlign="center" mb={1}>
            <Loader width={40} height={40} />
          </Box>
        )}

        {hasMore && !loadingMore && (
          <Box ref={loadMoreRef} sx={{ height: "1px" }} />
        )}
        {messages?.map((msg, idx) => {
          const MotionComponent = motion.div;
          return (
            <MotionComponent
              key={msg.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg?.isSentMessage ? (
                <SentMessage msg={msg} />
              ) : (
                <ReceivedMessage msg={msg} />
              )}
            </MotionComponent>
          );
        })}
        <Box ref={bottomRef} />
      </Box>
    </>
  );
};
export default RenderMessages;
