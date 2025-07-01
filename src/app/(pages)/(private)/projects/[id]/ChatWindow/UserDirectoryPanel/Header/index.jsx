import { useAppContext } from "@/context/App/AppContext";
import useResponsiveValue from "@/hooks/common/responsive/useResponsiveValue";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, IconButton } from "@mui/material";

const Header = ({ isExpanded,setIsExpanded, toggleExpand, setSelectedDirectoryItem,clearInput }) => {
  const {fontSize} = useResponsiveValue();
  const {isXs} = useResponsiveBreakpoints();
  const { activeUser } = useAppContext()?.state;
  const handleResetDirectory = () => {
         setSelectedDirectoryItem(null);
         clearInput();
         setIsExpanded(false);
  }
  return (
    <>
      <Box
        p={"20px 20px 0px 20px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
           { isExpanded &&  (
            <>
            <Box position={"relative"} display={"inline-flex"} flexShrink={0}>
              <Box
                position={"relative"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexShrink={0}
                overflow={"hidden"}
                fontWeight={500}
                width={isXs ? 34 : 48}
                height={isXs ? 34 : 48}
                borderRadius={"50%"}
                sx={{ cursor: "pointer" }}
              >
                <img
                  src={activeUser?.avatar || "/dummyUser.svg"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    textIndent: "10000px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  position: "absolute",
                  top: "auto",
                  right: "14%",
                  bottom: "14%",
                  transform: "scale(1) translate(50%,50%)",
                  background: "#22C55E",
                  borderRadius: "10px",
                }}
              ></Box>
            </Box>
            <Box flexGrow={1} />
            </>
            )}
        <IconButton
          onClick={toggleExpand}
          sx={{
            borderRadius: "50%",
            flex: "0 0 auto",
          }}
        >
          <img
            src="/toggleDrawerIcon.svg"
            alt="toggle"
            style={{
              width: isXs ? 16 : "20px",
              height: isXs ? 16 :  "20px",
              flexShrink: 0,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </IconButton>
         { isExpanded && (<IconButton
            onClick={handleResetDirectory}
            sx={{
              borderRadius: "50%",
              flex: "0 0 auto",
              "&:hover": {
                background: "rgba(99,115,129,0.08)",
              },
            }}
          >
            <img
              src="/addUser.svg"
              alt="user"
              style={{ width:  isXs ? 18 :  "24px", height: isXs ? 18 :  "24px", flexShrink: 0 }}
            />
          </IconButton>)}
      </Box>
    </>
  );
};
export default Header;
