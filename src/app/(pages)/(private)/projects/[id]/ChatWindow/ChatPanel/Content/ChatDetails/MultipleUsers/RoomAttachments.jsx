import { Box, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const RoomAttachments = () => {
    return <>
       <Box
        sx={{
          background: "#F4F6F8",
          p: "8px 12px 8px 20px",
          height: 40,
          position: "relative",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent:'space-between',
          flexShrink:0,
        }}
      >
        <Typography color="#637381" fontWeight={700} fontSize={12}>
          Attachments (0)
        </Typography>
        <KeyboardArrowRightIcon sx={{ color: "#637381",width:"16px",height:"16px",flexShrink:0 }} />
      </Box>
      <Box minHeight={0} display={'flex'} flexDirection={'column'} flex={'1 1 auto'}>
        <Box display={'flex'} flexDirection={'column'} sx={{
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
        }}>

        </Box>
      </Box>
    </>
}
export default RoomAttachments;