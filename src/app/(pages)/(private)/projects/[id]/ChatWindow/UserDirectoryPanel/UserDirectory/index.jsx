import { Box } from "@mui/material";
import UserDIrectoryItem from "./UserDIrectoryItem";

const UserDirectory= () => {
    return <>
    <Box minWidth={0} minHeight={0} flexGrow={1} display={'flex'} flexDirection={'column'} pb={1} position={'relative'} justifyContent={'flex-start'} alignItems={'flex-start'} >
    <Box height={'100%'} overflow={'auto'}  width={'100%'}>
        <Box pb={1} minHeight={'100%'} display={'flex'} flexDirection={'column'}>
         <UserDIrectoryItem />
        </Box>
    </Box>
    </Box>
    </>
}
export default UserDirectory;