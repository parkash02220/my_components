import React from "react";
import { Drawer, Paper, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
const RightDrawer = ({
  open,
  handleDrawer,
  header,
  children,
  footer,
  className,
  width,
  overflowY,
  noFooterBorderTop,
}) => {
  const { isDownXs } = useResponsiveBreakpoints();
  return (
    <Drawer
      className={className}
      anchor="right"
      open={open}
      onClose={handleDrawer}
      BackdropProps={{
        sx: {
          backgroundColor: "transparent",
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      {isDownXs && (
        <IconButton
          aria-label="close"
          onClick={handleDrawer}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "#1C252E",
            zIndex: 1,
          }}
        >
          <CloseIcon
            sx={{
              width: "18px",
              height: "18px",
            }}
          />
        </IconButton>
      )}
      <Paper
        className="right_drawer_paper"
        sx={{
          width: isDownXs ? "100vw" : width || 480,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0px 8px 10px -5px rgba(145 158 171 / 0.2), 0px 16px 24px 2px rgba(145 158 171 / 0.14), 0px 6px 30px 5px rgba(145 158 171 / 0.12)",
        }}
      >
        {header && <Box>{header}</Box>}

        <Box
          sx={{
            flex: 1,
            overflowY: overflowY || "auto",
            minHeight: 0,
          }}
        >
          {children}
        </Box>

        {footer && (
          <Box sx={{ borderTop: !noFooterBorderTop && "1px solid #eee" }}>
            {footer}
          </Box>
        )}
      </Paper>
    </Drawer>
  );
};

export default RightDrawer;
