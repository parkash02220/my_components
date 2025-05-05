// SideDrawerStyles.js
"use client";

import { styled } from "@mui/material/styles";
import { AppBar as MuiAppBar, Drawer as MuiDrawer } from "@mui/material";

export const drawerWidth = 300;
export const miniDrawerWidth = 88;
export const drawerTransitionDuration = 120;
export const drawerEasing = "cubic-bezier(0.4, 0, 0.6, 1)";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: `width ${drawerTransitionDuration}ms ${drawerEasing}`,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: miniDrawerWidth,
  transition: `width ${drawerTransitionDuration}ms ${drawerEasing}`,
  overflowX: "hidden",
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "ismd" && prop !== "isxs",
})(({ theme, open, ismd,isxs }) => ({
  width: ismd ? '60px ' : open ? drawerWidth : miniDrawerWidth,
  left: 0,
  right: "auto",
  position: "fixed",
  transition: `width ${drawerTransitionDuration}ms ${drawerEasing}`,
  overflowX: "hidden",
  boxSizing: "border-box",
  zIndex: 800,
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
  borderRight: ismd ? "" : "1px solid rgba(145,158,171,0.12)",
  borderBottom : ismd ? "1px solid #eee" : "",
  height: isxs ? "65px" : ismd ? '76px' : 'auto',
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 799,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      // "&:hover": {
      //   scrollbarWidth: "thin", // Firefox
      //   "&::-webkit-scrollbar": {
      //     width: "8px",
      //   },
      //   "&::-webkit-scrollbar-thumb": {
      //     backgroundColor: "rgba(0, 0, 0, 0.2)",
      //     borderRadius: "4px",
      //   },
      //   "&::-webkit-scrollbar-track": {
      //     backgroundColor: "transparent",
      //   },
      // },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
  }),
}));
