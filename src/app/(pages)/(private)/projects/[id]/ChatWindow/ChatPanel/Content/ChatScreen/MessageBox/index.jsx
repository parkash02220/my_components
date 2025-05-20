import { Box } from "@mui/material";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

const MessageBox = () => {
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          minHeight={0}
          paddingInline={3}
          pt={5}
          pb={3}
          width={'100%'}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
          <SentMessage />
          <ReceivedMessage />
        </Box>
      </Box>
    </>
  );
};
export default MessageBox;
