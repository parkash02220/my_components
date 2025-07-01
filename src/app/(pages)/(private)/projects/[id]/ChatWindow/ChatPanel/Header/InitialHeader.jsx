import MyAutoCompleteVarient from "@/components/MyAutoComplete/MyAutoCompleteVarient";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, Typography } from "@mui/material";

const InitialHeader = ({ selectedUsers, setSelectedUsers }) => {
  const {isXs} = useResponsiveBreakpoints();
  const {fontSize} = useResponsiveValue();
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={2} width={'100%'}>
        <Typography variant="primary" fontWeight={600}>
          To:
        </Typography>
        <Box minWidth={isXs ? 100 : 320} flex={isXs ? 1 : undefined}>
          <MyAutoCompleteVarient
            type="chatroom_users"
            selectedOptions={selectedUsers}
            setSelectedOptions={setSelectedUsers}
            label="Select users"
          />
        </Box>
      </Box>
    </>
  );
};
export default InitialHeader;
