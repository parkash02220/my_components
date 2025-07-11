"use client";
import { Box } from "@mui/material";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

export default function ScrollBox({
  children,
  type = "vertical",
  showOnHover = true,
  scrollbarSize = "6px",
  thumbColor = 'rgba(145, 158, 171, 0.4)',
  hoverThumbColor = 'rgba(99, 115, 129, 0.6)',
  sx = {},
  ...rest
}) {

  let overflowX = "hidden";
  let overflowY = "hidden";

  if (type === "vertical") overflowY = "auto";
  else if (type === "horizontal") overflowX = "auto";
  else if (type === "both") {
    overflowX = "auto";
    overflowY = "auto";
  }

  return (
    <Box
      component={SimpleBar}
      sx={{
        flex: '1 1 auto',
        minHeight: 0,
        overflowX,
        overflowY,

        '& .simplebar-scrollbar:before': {
          backgroundColor: thumbColor,
          borderRadius: 4,
        },
        '& .simplebar-scrollbar.simplebar-visible:before': {
          backgroundColor: hoverThumbColor,
        },

        '& .simplebar-track.simplebar-vertical': {
          width: scrollbarSize,
          transition: 'opacity 0.3s',
          opacity: showOnHover ? 0 : 1,
        },
        '&:hover .simplebar-track.simplebar-vertical': {
          opacity: 1,
        },

        '& .simplebar-track.simplebar-horizontal': {
          height: scrollbarSize,
          transition: 'opacity 0.3s',
          opacity: showOnHover ? 0 : 1,
        },
        '&:hover .simplebar-track.simplebar-horizontal': {
          opacity: 1,
        },

        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
