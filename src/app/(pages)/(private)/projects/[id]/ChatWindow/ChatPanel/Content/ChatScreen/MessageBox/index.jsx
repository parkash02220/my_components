import { Box } from "@mui/material";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import InitialMessageBox from "./InitialMessageBox";
import SingleUser from "./SingleUser";
import { useAppContext } from "@/context/App/AppContext";
import GroupUsers from "./GroupUsers";

const MessageBox = ({ selectedDirectoryItem, chatType }) => {
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
               <GroupUsers/>
              </>
            ) : (
              <SingleUser />
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
