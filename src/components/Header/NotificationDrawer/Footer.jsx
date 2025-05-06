import { Box, Button } from "@mui/material";

export const Footer = () => {
    return <>
    <Box className="notificationDrawer__footer" padding={'8px'}>
        <Button sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontWeight:700,
            minWidth:64,
            height:48,
            textDecoration:'none',
            borderRadius:"8px",
            padding:"8px 10px",
            color:"#1C252E",
            width:'100%',
            '&:hover':{
                background:"rgba(145,158,171,0.08)",
            }
        }}>
         View all
        </Button>
    </Box>
    </>
}