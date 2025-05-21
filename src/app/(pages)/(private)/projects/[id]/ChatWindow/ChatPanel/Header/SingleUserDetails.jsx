import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../components/UserWithStatus";
import { getFullName } from "@/utils";

const SingleUserDetails = ({chatType,userDetails}) => {
    return <>
    <Box display={'flex'} gap={2} alignItems={'center'}>
      <UserWithStatus width={40} height={40} type={chatType} avatar={userDetails?.avatar}/>
      <Box flex={'1 1 auto'} minWidth={0} >
         <Typography color="#1C252E" fontSize={14} fontWeight={600} >{getFullName(userDetails?.firstName,userDetails?.lastName)}</Typography>
         <Typography color="#637381" fontSize={14} >always</Typography>
      </Box>
    </Box>
    </>
}
export default SingleUserDetails;