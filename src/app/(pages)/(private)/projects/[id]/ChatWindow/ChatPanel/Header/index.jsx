import { Box } from "@mui/material";
import SingleUserDetails from "./SingleUserDetails";
import HeaderIconButtons from "./HeaderIconButtons";
import GroupUsersDetails from "./GroupUsersDetails";
import InitialHeader from "./InitialHeader";

const Header = ({ toggleExpand, chatType, selectedDirectoryItem }) => {
  return (
    <>
      <Box
        height={72}
        flexShrink={0}
        display={"flex"}
        alignItems={"center"}
        padding={"8px 8px 8px 20px"}
        borderBottom={"1px solid rgba(145,158,171,0.2)"}
      >
        {!selectedDirectoryItem ? (
          <InitialHeader />
        ) : chatType === "group__chat" ? (
          <GroupUsersDetails
            chatType={chatType}
            groupDetails={selectedDirectoryItem}
          />
        ) : (
          <SingleUserDetails
            chatType={chatType}
            userDetails={selectedDirectoryItem}
          />
        )}
     { selectedDirectoryItem &&   <HeaderIconButtons toggleExpand={toggleExpand} selectedDirectoryItem={selectedDirectoryItem}/>}
      </Box>
    </>
  );
};
export default Header;
