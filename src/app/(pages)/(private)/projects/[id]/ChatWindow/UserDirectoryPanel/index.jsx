import { Box, IconButton } from "@mui/material";
import Header from "./Header";
import SearchBox from "./SearchBox";
import UserDirectory from "./UserDirectory";

const UserDirectoryPanel = () => {
    return <>
    <Box sx={{
        display:'flex',
        flexDirection:'column',

    }}> 
    <IconButton sx={{
        background: "#00A76F",
        top:"84px",
        left:"0px",
        zIndex:9,
        width:32,
        height:32,
        position:"absolute",
        boxShadow:"0 8px 16px 0 rgba(0 167 111 / 0.24)",
        color:"#FFFFFF",
        padding:"0px",
        borderRadius:"0px 12px 12px 0px",
        display:'none',
        '&:hover':{
            background:"#004B50",
        }
    }}>
         <img src="/showUsersIcon.svg" alt="users" style={{width:"16px",height:"16px",flexShrink:0}} />
    </IconButton>
    <Box minHeight={0} width={320} display={'flex'} flexDirection={'column'} flex={'1 1 auto'} borderRight={'1px solid rgba(145,158,171,0.2)'}>
      <Header />
      <SearchBox />
      <UserDirectory />
    </Box>
    </Box>
    </>
}
export default UserDirectoryPanel;