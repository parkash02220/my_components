import { Box, IconButton, Typography } from "@mui/material";

const ReceivedMessage = () => {
  return (
    <>
      <Box mb={5} display={"flex"}>
        <Box
          mr={2}
          width={32}
          height={32}
          overflow={"hidden"}
          borderRadius={"50%"}
          flexShrink={0}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
        >
            <img src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-7.webp" alt="sender" style={{width:"100%",height:"100%",textIndent:"10000px",objectFit:"cover"}} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          <Box>
            <Typography
              color="#919EAB"
              mb={1}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              fontSize={12}
              mr={'auto'}
            >
             parkash, 6 hours
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} position={"relative"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              padding={"12px"}
              minWidth={48}
              maxWidth={320}
              borderRadius={1}
              fontSize={14}
              bgcolor={"#F4F6F8"}
              color={"#1C252E"}
            >
              The concert was a mesmerizing experience, with the music filling
              the venue and the crowd cheering in delight.
            </Box>
            <Box
              pt={"4px"}
              sx={{
                opacity: 0,
                position: "absolute",
                display: "flex",
                top: "100%",
                left: "0px",
                transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <IconButton
                sx={{
                  "&:hover": {
                    background: "99,115,129,0.08",
                  },
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                <img
                  src="/replyMsgIcon.svg"
                  alt="reply"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                />
              </IconButton>
              <IconButton
                sx={{
                  "&:hover": {
                    background: "99,115,129,0.08",
                  },
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                <img
                  src="/emojiIcon.svg"
                  alt="react"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                />
              </IconButton>
              <IconButton
                sx={{
                  "&:hover": {
                    background: "99,115,129,0.08",
                  },
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                <img
                  src="/deleteIcon.svg"
                  alt="delete"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ReceivedMessage;
