import { Box, Typography } from "@mui/material";

export default function SubComments({subComments}) {
  return (
    <>
      <Box display={"flex"} gap={"2px"}>
        <Box width={16} height={16}>
          <img
            src="/taskCardCommentIcon.svg"
            alt="comments"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Typography fontSize={12} color="#919EAB">
          {subComments?.length || 0}
        </Typography>
      </Box>
    </>
  );
}
