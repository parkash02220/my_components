import { Box } from "@mui/material";

export default function UserWithStatus({ width, height, type }) {
  if (type === "group__chat") {
  return <Box position={"relative"} display={"inline-flex"} flexShrink={0}>
        <Box
          display={"flex"}
          flexDirection={"row-reverse"}
          justifyContent={"flex-end"}
          position={"relative"}
          width={width || 48}
          height={height || 48}
          gap={-1}
        >
          <Box
            width={32}
            height={32}
            position={"absolute"}
            zIndex={9}
            left={0}
            bottom={0}
            border={"2px solid #FFFFFF"}
            display={"flex"}
            flexShrink={0}
            borderRadius={"50%"}
            overflow={"hidden"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-8.webp"
              alt="user"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                textIndent: "10000px",
              }}
            />
          </Box>
          <Box
            top={0}
            right={0}
            width={32}
            height={32}
            position={"absolute"}
            border={"2px solid #FFFFFF"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexShrink={0}
            borderRadius={"50%"}
            overflow={"hidden"}
          >
            <img
              src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-7.webp"
              alt="user"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                textIndent: "10000px",
              }}
            />
          </Box>
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
  }
  return (
    <>
      <Box position={"relative"} display={"inline-flex"} flexShrink={0}>
        <Box
          position={"relative"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexShrink={0}
          overflow={"hidden"}
          fontWeight={500}
          width={width || 48}
          height={height || 48}
          borderRadius={"50%"}
          sx={{ cursor: "pointer" }}
          border={'2px solid #FFFFFF'}
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
    </>
  );
}
