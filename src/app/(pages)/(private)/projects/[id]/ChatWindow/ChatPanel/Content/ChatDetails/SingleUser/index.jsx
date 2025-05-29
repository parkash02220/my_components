import { Box } from "@mui/material";
import UserDetails from "./UserDetails";
import UserInformation from "./UserInformation";
import UserAttachments from "./UserAttachments";

const SingleUser = ({ selectedDirectoryItem }) => {
    const user = selectedDirectoryItem?.targetUser || selectedDirectoryItem;
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        flex={"1 1 auto"}
      >
        <UserDetails user={user} />
        <UserInformation user={user}/>
        <UserAttachments />
      </Box>
    </>
  );
};
export default SingleUser;
