import { useAppContext } from "@/context/App/AppContext";
import { Box, IconButton } from "@mui/material";

const Header = ({ isExpanded, toggleExpand }) => {
  const {activeUser} = useAppContext()?.state;
  return (
    <>
      <Box
        p={"20px 20px 0px 20px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isExpanded && (
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
              width={48}
              height={48}
              borderRadius={"50%"}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={activeUser?.avatar || '/dummyUser.svg'}
                alt="avatar"
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
              width: "20px",
              height: "20px",
              flexShrink: 0,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </IconButton>
      { isExpanded &&  <IconButton
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
            style={{ width: "24px", height: "24px", flexShrink: 0 }}
          />
        </IconButton>}
      </Box>
    </>
  );
};
export default Header;
