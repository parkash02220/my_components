import { Box } from "@mui/material";
import UserDetails from "./UserDetails";
import UserInformation from "./UserInformation";
import UserAttachments from "./UserAttachments";

const SingleUser = () => {
    return <>
        <Box display={'flex'} flexDirection={'column'} overflow={'auto'} flex={'1 1 auto'}>
    <UserDetails />
    <UserInformation />
    <UserAttachments />
    </Box>
    </>
}
export default SingleUser;