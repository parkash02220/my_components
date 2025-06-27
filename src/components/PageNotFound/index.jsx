"use client";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const { isDownXs, isDownMd } = useResponsiveBreakpoints();
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
              width: isDownXs ? "200px" : "300px",
              height: isDownXs ? "200px" : "300px",
              borderRadius: "50%",
              background: "rgb(217, 217, 217)",
            }}
          ></Box>
          <Box>
            <Typography
              fontSize={isDownXs ? 38 : isDownMd ? 50 : 60}
              fontWeight={700}
              color="#1C252E"
              textAlign={'center'}
            >
              {` 404 Page not found`}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography variant="title2">
              {`Looks like something's broken.It's not you its us.`}
            </Typography>
            <Typography variant="title2">
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
