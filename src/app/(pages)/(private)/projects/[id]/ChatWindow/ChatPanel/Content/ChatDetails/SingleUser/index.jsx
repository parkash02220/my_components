import { Box } from "@mui/material";
import UserDetails from "./UserDetails";
import UserInformation from "./UserInformation";
import UserAttachments from "./UserAttachments";

const SingleUser = ({ activeChatRoom }) => {
    const user = activeChatRoom?.targetUser || activeChatRoom;
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        flex={"1 1 auto"}
        minHeight={0}
      >
        <UserDetails user={user} />
        <UserInformation user={user}/>
        {/* <UserAttachments /> */}
      </Box>
    </>
  );
};
export default SingleUser;
