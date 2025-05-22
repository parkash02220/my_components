import MySelect from "@/components/MySelect/MySelect";
import { Box, Typography } from "@mui/material";

const InitialHeader = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Typography variant="h6" fontWeight={600} fontSize={14} color="#1C252E">
          To:
        </Typography>
        <Box minWidth={320}>
          <MySelect
            placeholder={"+ Recipients"}
            label=""
            hoverBorderColor={"#1C252E"}
            focusedBorder="2px solid #1C252E"
            borderRadius="8px"
            borderColor="#ccc"
            value={''}
          />
        </Box>
      </Box>
    </>
  );
};
export default InitialHeader;
