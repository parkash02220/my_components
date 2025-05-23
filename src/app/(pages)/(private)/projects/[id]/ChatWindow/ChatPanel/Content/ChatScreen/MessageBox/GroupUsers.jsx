import Loader from "@/components/Loader/Loader";
import { useChatContext } from "@/context/Chat/ChatContext";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
const GroupUsers = ({ loadingStartGroupChat }) => {
  const { groupChat, loadingGroupChat } = useChatContext().state;
  const { messages } = groupChat;
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (loadingGroupChat || loadingStartGroupChat) {
    return (
      <Box height={"100%"} position={"absolute"} width={"100%"}>
        <Loader />
      </Box>
    );
  }
  return (
    <>
      <Box>
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
export default GroupUsers;