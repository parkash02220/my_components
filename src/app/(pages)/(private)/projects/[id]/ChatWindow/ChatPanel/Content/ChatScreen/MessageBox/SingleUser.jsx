import { useChatContext } from "@/context/Chat/ChatContext";
import { Box } from "@mui/material";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Loader from "@/components/Loader/Loader";
const SingleUser = ({  }) => {
  const { singleUserChat, loadingSingleUserChat } = useChatContext().state;
  const { messages } = singleUserChat;
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (loadingSingleUserChat) {
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

export default SingleUser;
