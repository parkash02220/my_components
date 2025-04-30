import PageNotFound from "@/components/PageNotFound";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Box
        className="pageNotFound__container"
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          flexDirection={"column"}
        >
          <Box
            sx={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgb(217, 217, 217)",
            }}
          ></Box>
          <Box>
            <Typography variant="h1" fontSize={48} color="#1C252E">
              404 Project not found
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography color="#1C252E">
              Looks like something's broken.It's not you its us.
            </Typography>
            <Typography color="#1C252E">
              How about selecting other page?.
            </Typography>
          </Box>
          <Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
