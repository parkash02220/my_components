import { Box } from "@mui/material";
import UserDIrectoryItem from "./UserDIrectoryItem";

const UserDirectory = ({ isExpanded }) => {
  return (
    <>
      <Box
        minWidth={0}
        minHeight={0}
        flex={"1 1 auto"}
        display={"flex"}
        flexDirection={"column"}
        pb={1}
        position={"relative"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Box
          height={"100%"}
          width={"100%"}
          minHeight={0}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box pb={1} display={"flex"} flexDirection={"column"}>
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem type={"group__chat"} isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
            <UserDIrectoryItem isExpanded={isExpanded} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default UserDirectory;
