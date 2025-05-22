import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import useGetActiveUser from "@/hooks/user/activeUser/useGetActiveUser";
const { IconButton, Typography, Box } = require("@mui/material");
const { useState } = require("react");
const { default: ProfileDrawer } = require("./ProfileDrawer");

const HeaderUserProfile = ({ activeUser }) => {
  const { isMd, isSm, isXs } = useBreakpointFlags();
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  const OpenProfileDrawer = () => {
    setProfileDrawerOpen(true);
  };
  const CloseProfileDrawer = () => {
    setProfileDrawerOpen(false);
  };
  return (
    <>
      <ProfileDrawer
        open={profileDrawerOpen}
        handleDrawer={CloseProfileDrawer}
      />
      <IconButton
        onClick={OpenProfileDrawer}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "transparent",
          fontSize: "24px",
          color: "#637381",
          outline: "0px",
          borderWidth: "0px",
          margin: "0px",
          textDecoration: "none",
          flex: "0 0 auto",
          borderRadius: "50%",
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "rgba(99,115,129,0.08)",
          },
        }}
      >
        {activeUser ? (
          <Box
            sx={{
              minWidth: "unset",
              minHeight: "unset",
              overflow: "hidden",
              position: "relative",
              padding: "3px",
              borderRadius: "50%",
              width: isXs ? "36px" : "40px",
              height: isXs ? "36px" : "40px",
            }}
          >
            <Box
              sx={{
                textAlign: "initial",
                width: "100%",
                height: "100%",
                position: "absolute",
                color: "#00A76F",
                padding: "1px",
                inset: "0px",
                margin: "auto",
                borderRadius: "inherit",
                animation: "rotateClockwise 5s linear infinite",
                WebkitMaskImage:
                  "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                WebkitMaskComposite: "xor",
                maskImage:
                  "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                maskComposite: "exclude",
              }}
            >
              <img
                src="/animationSvgWrapper.svg"
                alt="wrapper"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
              />
              <Typography
                sx={{
                  transform:
                    "translateX(32.1081px) translateY(0.725105px) translateX(-50%) translateY(-50%)",
                  width: "60px",
                  height: "60px",
                  filter: "blur(8px)",
                  position: "absolute",
                  background: "radial-gradient(#00A76F 40%, transparent 80%)",
                }}
              ></Typography>
            </Box>
            <Box
              sx={{
                textAlign: "initial",
                width: "100%",
                height: "100%",
                position: "absolute",
                transform: "scale(-1, -1)",
                color: "#FFABOO",
                padding: "1px",
                inset: "0px",
                margin: "auto",
                borderRadius: "50%",
                animation: "rotateCounterClockwise 7s linear infinite",
                WebkitMaskImage:
                  "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                WebkitMaskComposite: "xor", // for WebKit browsers (Chrome/Safari)
                maskImage:
                  "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                maskComposite: "exclude", // Firefox supports 'exclude' instead of 'xor'
              }}
            >
              <img
                src="/animationSvgWrapper.svg"
                alt="wrapper"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
              />
              <Typography
                sx={{
                  transform:
                    "translateX(32.1081px) translateY(0.725105px) translateX(-50%) translateY(-50%)",
                  width: "60px",
                  height: "60px",
                  filter: "blur(8px)",
                  position: "absolute",
                  background: "radial-gradient(#FFABOO 40%, transparent 80%)",
                }}
              ></Typography>
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "20px",
                lineHeight: 1,
                borderRadius: "50%",
                overflow: "hidden",
                userSelect: "none",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={activeUser?.avatar}
                alt="avatar"
                 referrerPolicy="no-referrer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  textIndent: "1000px",
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "unset",
              minHeight: "unset",
              overflow: "hidden",
              position: "relative",
              padding: "3px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              background: "#F4F4F4",
              border: "1px dotted #1C252E",
            }}
          >
            <img
              src={"/dummyUser.svg"}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                textIndent: "1000px",
              }}
            />
          </Box>
        )}
      </IconButton>
    </>
  );
};
export default HeaderUserProfile;
