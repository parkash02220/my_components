import { Box, IconButton } from "@mui/material";
import Header from "./Header";
import SearchBox from "./SearchBox";
import UserDirectory from "./UserDirectory";
import { useState } from "react";

const UserDirectoryPanel = ({ handleChatStart, setSelectedDirectoryItem,onlineUsers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => {
    setIsExpanded((pre) => !pre);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // flex:1,
          minHeight: 0,
          width: isExpanded ? 320 : 96,
          transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <IconButton
          sx={{
            background: "#00A76F",
            top: "84px",
            left: "0px",
            zIndex: 9,
            width: 32,
            height: 32,
            position: "absolute",
            boxShadow: "0 8px 16px 0 rgba(0 167 111 / 0.24)",
            color: "#FFFFFF",
            padding: "0px",
            borderRadius: "0px 12px 12px 0px",
            display: "none",
            "&:hover": {
              background: "#004B50",
            },
          }}
        >
          <img
            src="/showUsersIcon.svg"
            alt="users"
            style={{ width: "16px", height: "16px", flexShrink: 0 }}
          />
        </IconButton>
        <Box
          minHeight={0}
          display={"flex"}
          flexDirection={"column"}
          flex={"1 1 auto"}
          borderRight={"1px solid rgba(145,158,171,0.2)"}
        >
          <Header
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
            setSelectedDirectoryItem={setSelectedDirectoryItem}
          />
          {isExpanded && <SearchBox />}
          <UserDirectory
            isExpanded={isExpanded}
            handleChatStart={handleChatStart}
            onlineUsers={onlineUsers}
          />
        </Box>
      </Box>
    </>
  );
};
export default UserDirectoryPanel;
