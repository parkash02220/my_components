import { Box } from "@mui/material";

import SingleUser from "./SingleUser";
import MultipleUsers from "./MultipleUsers";

const ChatDetails = ({ isExpanded, chatType, selectedDirectoryItem }) => {
  return (
    <>
      <Box
        minHeight={0}
        display={"flex"}
        flexDirection={"column"}
        width={280}
        sx={{
          width: isExpanded ? 280 : 0,
          overflow: "hidden",
          transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Box
          display={"flex"}
          minHeight={0}
          flexDirection={"column"}
          flex={"1 1 auto"}
          borderLeft={"1px solid rgba(145,158,171,0.2)"}
        >
          {chatType === "group__chat" ? (
            <MultipleUsers selectedDirectoryItem={selectedDirectoryItem} />
          ) : (
            <SingleUser selectedDirectoryItem={selectedDirectoryItem} />
          )}
        </Box>
      </Box>
    </>
  );
};
export default ChatDetails;
