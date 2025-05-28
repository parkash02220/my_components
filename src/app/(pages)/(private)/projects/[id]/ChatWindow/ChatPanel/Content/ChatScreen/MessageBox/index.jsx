import { Box, Typography } from "@mui/material";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import InitialMessageBox from "./InitialMessageBox";
import SingleUser from "./SingleUser";
import { useAppContext } from "@/context/App/AppContext";
import GroupUsers from "./GroupUsers";
import { useChatContext } from "@/context/Chat/ChatContext";
import React from "react";
import TypingIndicator from "./TypingIndicator";
import { getFullName } from "@/utils";

const MessageBox = ({ selectedDirectoryItem, chatType }) => {
  const { typingUsers } = useChatContext().state;
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
        {selectedDirectoryItem ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            minHeight={0}
            paddingInline={3}
            pt={5}
            pb={3}
            width={"100%"}
            sx={{
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {chatType === "group__chat" ? (
              <>
                <GroupUsers typingUsers={typingUsers} />
              </>
            ) : (
              <SingleUser typingUsers={typingUsers} />
            )}
            {isSomeoneTyping &&
                 (
                    <TypingIndicator username={getFullName(typingUser?.firstName,typingUser?.lastName)}/>
                )
          }
          </Box>
        ) : (
          <InitialMessageBox />
        )}
      </Box>
    </>
  );
};
export default MessageBox;
