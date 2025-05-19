import { Box, Typography } from "@mui/material";
import UserDirectoryPanel from "./UserDirectoryPanel";

const ChatWindow = ({projectId}) => {
    return <>
    <Box className="chatWindow__container" sx={{
        display:'flex',
        flexDirection:'column',
        flex:'1 1 auto',
        padding:"8px 40px 64px 40px",
        marginInline:'auto',
    }}
    >
        <Typography variant="h4" color="#1C252E" mb={5} fontSize={24} >Chat</Typography>
        <Box sx={{
            flex:' 1 1 0px',
            display:'flex',
            position:'relative',
            boxShadow:"0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
            borderRadius:2,
            background:"#FFFFFF",
        }}>
            <UserDirectoryPanel />
        </Box>
    </Box>
    </>
}
export default ChatWindow;