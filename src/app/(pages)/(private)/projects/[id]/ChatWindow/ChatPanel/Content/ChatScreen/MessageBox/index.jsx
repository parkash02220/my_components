import { Box, Typography } from "@mui/material";
import InitialMessageBox from "./InitialMessageBox";
import { useChatContext } from "@/context/Chat/ChatContext";
import React from "react";
import TypingIndicator from "./TypingIndicator";
import { getFullName } from "@/utils";
import RenderMessages from "./RenderMessages";

const MessageBox = () => {
  const { typingUsers,activeChatRoom } = useChatContext().state;
  const isSomeoneTyping = typingUsers?.length > 0;
  const typingUser = typingUsers[typingUsers?.length - 1];
  return (
    <>
      <Box
        minWidth={0}
        minHeight={0}
        display={"flex"}
        flexDirection={"column"}
        flex={"1 1 auto"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        position={"relative"}
      >
        {activeChatRoom ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            minHeight={0}
            pt={2}
            pb={3}
            width={"100%"}
            sx={{
              paddingInline:{xs:1,sm:3},
            }}
          >
            <RenderMessages activeChatRoom={activeChatRoom} />
            {isSomeoneTyping && (
              <TypingIndicator
                username={getFullName(
                  typingUser?.firstName,
                  typingUser?.lastName
                )}
              />
            )}
          </Box>
        ) : (
          <InitialMessageBox />
        )}
      </Box>
    </>
  );
};
export default MessageBox;
