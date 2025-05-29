import { Box, Typography } from "@mui/material";

const InitialMessageBox = () => {
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
        <Typography fontSize={18} color="#919EAB" fontWeight={600}>
          Welcome !
        </Typography>
        <Typography fontSize={14} color="#919EAB">
          Write something awesome...
        </Typography>
      </Box>
    </>
  );
};
export default InitialMessageBox;
