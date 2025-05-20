import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../components/UserWithStatus";

const UserDetails = () => {
    return <>
    <Box display={'flex'} gap={2} alignItems={'center'}>
      <UserWithStatus width={40} height={40} />
      <Box flex={'1 1 auto'} minWidth={0} >
         <Typography color="#1C252E" fontSize={14} fontWeight={600} >Suraj mishra</Typography>
         <Typography color="#637381" fontSize={14} >always</Typography>
      </Box>
    </Box>
    </>
}
export default UserDetails;