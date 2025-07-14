import { Box, Typography } from "@mui/material";
import InitialMessageBox from "./InitialMessageBox";
import Loader from "@/components/Loader/Loader";
import { useChatContext } from "@/context/Chat/ChatContext";
import React from "react";
import TypingIndicator from "./TypingIndicator";
import { getFullName } from "@/utils";
import RenderMessages from "./RenderMessages";
import { API_CALL_STATES } from "@/constants";

const MessageBox = ({ status }) => {
  const { typingUsers, activeChatRoom } = useChatContext().state;
  const isSomeoneTyping = typingUsers?.length > 0;
  const typingUser = typingUsers[typingUsers?.length - 1];

  const isLoading = status === API_CALL_STATES.LOADING || status === API_CALL_STATES.IDLE;
  const isError = status === API_CALL_STATES.ERROR;
  const isSuccess = status === API_CALL_STATES.SUCCESS;

  return (
    <Box
      minWidth={0}
      minHeight={0}
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
    >
      {isLoading && (
        <Box flex="1 1 auto" width="100%" display="flex" justifyContent="center" alignItems="center">
          <Loader />
        </Box>
      )}

      {isError && (
        <InitialMessageBox message="Failed to load chat. Please try again." />
      )}

      {activeChatRoom && isSuccess && (
        <Box
          display="flex"
          flexDirection="column"
          minHeight={0}
          pt={2}
          pb={3}
          width="100%"
          sx={{
            paddingInline: { xs: 1, sm: 3 },
          }}
        >
          <RenderMessages activeChatRoom={activeChatRoom} />
          {isSomeoneTyping && (
            <TypingIndicator
              username={getFullName(typingUser?.firstName, typingUser?.lastName)}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MessageBox;
