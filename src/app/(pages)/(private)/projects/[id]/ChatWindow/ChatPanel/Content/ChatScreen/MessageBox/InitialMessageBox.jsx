import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, Typography } from "@mui/material";

const InitialMessageBox = () => {
  const {isXs} = useResponsiveBreakpoints();
  return (
    <>
      <Box
        flexGrow={1}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"0px 24px"}
        gap={1}
        flexDirection={"column"}
        width={"100%"}
      >
        <img
          src="/initialMsgIcon.svg"
          alt="message"
          style={{ width: "100%", maxWidth: "160px" }}
        />
        <Typography fontSize={isXs ? 16 : 18} color="#919EAB" fontWeight={600}>
          Welcome !
        </Typography>
        <Typography variant="disabled">
          Write something awesome...
        </Typography>
      </Box>
    </>
  );
};
export default InitialMessageBox;
