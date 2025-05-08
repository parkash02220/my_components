import useMarkAllNotificationAsRead from "@/hooks/notifications/useMarkAllNotificationAsRead";
import { Box, IconButton, Typography } from "@mui/material";


export const Header = ({ activeTask,handleDrawer }) => {
  const {loadingMarkAllAsRead,errorMarkAllAsRead,markAllNotificationsAsRead} = useMarkAllNotificationAsRead();
  const handleMarkAllAsReadButton = async () => {
        await markAllNotificationsAsRead();
  }
  return (
    <>
      <Box display={'flex'} padding={"16px 8px 16px 20px"} minHeight={68} alignItems={'center'}>
        <Box flexGrow={1}>
            <Typography color="#1C252E" variant="h6" fontSize={18} fontWeight={600}>Notifications</Typography>
        </Box>
        <Box display={'flex'}>
            <IconButton
            onClick={handleMarkAllAsReadButton}
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                background:"transparent",
                fontSize:'1.5rem',
                color:"#00A76F",
                padding:"8px",
                borderRadius:"50%",
                overflow:"hidden",
                '&:hover':{
                    background:"rgba(0,167,111,0.08)",
                },
            }}
            >
              <img src="/markAllReadIcon.svg" alt="mark all as read" style={{width:"20px",height:"20px",flexShrink:0}} />
            </IconButton>
            <IconButton
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                background:"transparent",
                fontSize:'1.5rem',
                color:"#637381",
                padding:"8px",
                borderRadius:"50%",
                overflow:"hidden",
                '&:hover':{
                    background:"rgba(99,115,129,0.08)",
                },
            }}
            >
              <img src="/settingIcon.svg" alt="mark all as read" style={{width:"20px",height:"20px",flexShrink:0}} />
            </IconButton>
        </Box>
      </Box>
    </>
  );
};
