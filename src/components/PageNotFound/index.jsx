"use client";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const {isXs,isMd} = useBreakpointFlags(); 
  const router = useRouter();
  const handleNavigationToHome = () => {
    router.push("/home");
  };
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
              width: isXs ? "200px" : "300px",
              height: isXs ? "200px" : "300px",
              borderRadius: "50%",
              background: "rgb(217, 217, 217)",
            }}
          ></Box>
          <Box>
            <Typography variant="h1" fontSize={isXs ? 38 : isMd ? 50 : 60} color="#1C252E">
              {` 404 Page not found`}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography color="#1C252E" fontSize={isXs ? 14 : 16}>
              {`Looks like something's broken.It's not you its us.`}
            </Typography>
            <Typography color="#1C252E" fontSize={isXs ? 14 : 16}>
              {`How about going back to the home page?.`}
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={handleNavigationToHome}
              variant="contained"
              sx={{
                background: "rgb(217, 217, 217)",
                color: "#1C252E",
                fontWeight: 700,
                minWidth: "200px",
              }}
            >
              Home Page
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PageNotFound;
