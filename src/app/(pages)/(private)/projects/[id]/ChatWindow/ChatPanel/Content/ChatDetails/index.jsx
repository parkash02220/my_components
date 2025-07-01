import { Box, IconButton } from "@mui/material";
import SingleUser from "./SingleUser";
import MultipleUsers from "./MultipleUsers";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import MobileSideDrawer from "@/components/MySideDrawer/MobileSideDrawer";

const ChatDetails = ({ isExpanded, setIsExpanded, selectedDirectoryItem }) => {
  const isGroup = selectedDirectoryItem?.isGroup;
  const { isXs } = useResponsiveBreakpoints();
  const handleMobileDrawer = () => {
    setIsExpanded(false);
  }
  return !isXs ? (
    <Box
      minHeight={0}
      display="flex"
      flexDirection="column"
      sx={{
        width: isExpanded ? 280 : 0,
        overflow: "hidden",
        transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box
        display="flex"
        minHeight={0}
        flexDirection="column"
        flex="1 1 auto"
        borderLeft="1px solid rgba(145,158,171,0.2)"
      >
        {isGroup ? (
          <MultipleUsers selectedDirectoryItem={selectedDirectoryItem} />
        ) : (
          <SingleUser selectedDirectoryItem={selectedDirectoryItem} />
        )}
      </Box>
    </Box>
  ) : (
    <MobileSideDrawer
      open={isExpanded}
      anchor="right"
      handleDrawer={handleMobileDrawer}
      width={"calc(100vw - 32px)"}
      showCloseDialogIcon={false}
      header={
        <Box>
          <IconButton
            onClick={handleMobileDrawer}
            sx={{
              color: "#637381",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m:1,
            }}
          >
            <img
              src="/closeSideBarArrow.svg"
              alt="close"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </Box>
      }
    >
      {isGroup ? (
        <MultipleUsers selectedDirectoryItem={selectedDirectoryItem} />
      ) : (
        <SingleUser selectedDirectoryItem={selectedDirectoryItem} />
      )}
    </MobileSideDrawer>
  );
};

export default ChatDetails;
