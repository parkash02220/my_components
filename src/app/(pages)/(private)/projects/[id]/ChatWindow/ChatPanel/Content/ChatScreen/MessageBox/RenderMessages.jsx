import Loader from "@/components/Loader/Loader";
import { useChatContext } from "@/context/Chat/ChatContext";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import useGetAllMessages from "@/hooks/chat/useGetAllMessages";
const RenderMessages = ({ activeChatRoom }) => {
  const {
    getAllMessages,
    loadMoreRef,
    messages,
    loading,
    loadingMore,
    error,
    pageSize,
    hasMore,
  } = useGetAllMessages();
  const bottomRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevMessagesLength = useRef(0);
  const scrollContainerRef = useRef(null);
  const preFirstMessageId = useRef(null);
  const prevScrollHeight = useRef(0);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (loadingMore) {
      prevScrollHeight.current = scrollContainer.scrollHeight;
    } else if (prevScrollHeight.current) {
        const newScrollHeight = scrollContainer.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight.current;
        scrollContainer.scrollTop += heightDiff;
        prevScrollHeight.current = 0;
    }
  }, [loadingMore, messages]);

  useEffect(()=>{
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || messages.length === 0) return;

    if (
      messages.length > prevMessagesLength.current &&
      preFirstMessageId.current === messages[0]?.id){
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
    }
  },[messages]);


  useEffect(() => {
    isFirstLoad.current = true;
    preFirstMessageId.current = null;
    prevMessagesLength.current = 0;
  }, [activeChatRoom?.id]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || messages.length === 0) return;
  
    if (isFirstLoad.current) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
      isFirstLoad.current = false;
    }
    preFirstMessageId.current=messages[0]?.id;
    prevMessagesLength.current = messages?.length;
  }, [messages]);
  

  if (loading) {
    return (
      <Box height={"100%"} position={"absolute"} width={"100%"}>
        <Loader />
      </Box>
    );
  }
  return (
    <>
      <Box
        ref={scrollContainerRef}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
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
