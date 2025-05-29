import { Box } from "@mui/material";
import SingleUser from "./SingleUser";
import MultipleUsers from "./MultipleUsers";

const ChatDetails = ({ isExpanded, selectedDirectoryItem }) => {
  const isGroup = selectedDirectoryItem?.isGroup;

  return (
    <Box
      minHeight={0}
      display="flex"
      flexDirection="column"
      sx={{
        width: isExpanded ? 280 : 0,
        overflow: "hidden",
        transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box
        display="flex"
        minHeight={0}
        flexDirection="column"
        flex="1 1 auto"
        borderLeft="1px solid rgba(145,158,171,0.2)"
      >
        {isGroup ? (
          <MultipleUsers selectedDirectoryItem={selectedDirectoryItem} />
        ) : (
          <SingleUser selectedDirectoryItem={selectedDirectoryItem} />
        )}
      </Box>
    </Box>
  );
};

export default ChatDetails;
