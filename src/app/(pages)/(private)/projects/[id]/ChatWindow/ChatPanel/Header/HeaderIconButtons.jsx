import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

const HeaderIconButtons = ({toggleExpand}) => {
  const {isXs} = useResponsiveBreakpoints();
  const icons = [
    {
      name: "call",
      src: "/callIcon.svg",
      alt: "call",
      onClick: () => console.log("::call icon clicked"),
    },
    {
      name: "video call",
      src: "/videoCallIcon.svg",
      alt: "video call",
      onClick: () => console.log("::video call icon clicked"),
    },
    {
      name: "toggle chat",
      src: "/toggleChatBoxIcon.svg",
      alt: "call",
      onClick:toggleExpand,
    },
    {
      name: "menu",
      src: "/menuVerticalIcon.svg",
      alt: "menu",
      onClick: () => console.log("::menu icon clicked"),
    },
  ];
  return (
    <>
      <Box flex={'1 0 auto'} display={"flex"} justifyContent={"flex-end"}>
        {icons?.map((icon, i) => {
          return (
            <React.Fragment key={i}>
              <IconButton
                onClick={icon?.onClick}
                sx={{
                  borderRadius: "50%",
                  flex: "0 0 auto",
                  "&:hover": {
                    background: "rgba(99,115,129,0.08)",
                  },
                }}
              >
                <img
                  src={icon?.src}
                  alt={icon?.alt}
                  style={{ width: isXs ? "16px" : "20px", height: isXs ? "16px" :  "20px", flexShrink: 0 }}
                />{" "}
              </IconButton>
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
};
export default HeaderIconButtons;
