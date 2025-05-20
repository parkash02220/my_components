import { Box } from "@mui/material";
import RoomDetails from "./RoomDetails";
import RoomAttachments from "./RoomAttachments";

const MultipleUsers = () => {
    return <>
        <Box display={'flex'} flexDirection={'column'} overflow={'auto'} flex={'1 1 auto'} minHeight={0}>
       <RoomDetails />
       <RoomAttachments />
    </Box>
    </>
}
export default MultipleUsers;