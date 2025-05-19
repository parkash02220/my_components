import { Box, Typography } from "@mui/material";

export default function UserDIrectoryItem() {
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          minWidth: 0,
          width: "100%",
          paddingInline: "20px",
          pt: "12px",
          pb: "12px",
          gap: 2,
        }}
      >
        <Box position={"relative"} display={"inline-flex"} flexShrink={0}>
          <Box
            position={"relative"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexShrink={0}
            overflow={"hidden"}
            fontWeight={500}
            width={48}
            height={48}
            borderRadius={"50%"}
            sx={{ cursor: "pointer" }}
          >
            <img
              src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp"
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                textIndent: "10000px",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              position: "absolute",
              top: "auto",
              right: "14%",
              bottom: "14%",
              transform: "scale(1) translate(50%,50%)",
              background: "#22C55E",
              borderRadius: "10px",
            }}
          ></Box>
        </Box>
        <Box sx={{flex:'1 1 auto',minWidth:0,}}>
         <Typography overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontWeight={600} fontSize={14} color="#1C252E">Parkash mishra</Typography>
         <Typography overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} color="#637381" fontSize={14}>You:hello</Typography>
        </Box>
        <Box display={'flex'} alignSelf={'stretch'} alignItems={'flex-end'} flexDirection={'column'}>
             <Typography overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} fontSize={12} color="#919EAB" mb={'12px'}>an hour</Typography>
        </Box>
      </Box>
    </>
  );
}
