import MyAutoCompleteVarient from "@/components/MyAutoComplete/MyAutoCompleteVarient";
import { Box, Typography } from "@mui/material";

const InitialHeader = ({ selectedUsers, setSelectedUsers }) => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Typography variant="h6" fontWeight={600} fontSize={14} color="#1C252E">
          To:
        </Typography>
        <Box minWidth={320}>
          <MyAutoCompleteVarient
            type="user"
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </Box>
      </Box>
    </>
  );
};
export default InitialHeader;
