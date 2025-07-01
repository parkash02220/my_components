import { Box, Drawer, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const MobileSideDrawer = ({
  open,
  anchor="left",
  handleDrawer,
  header,
  children,
  footer,
  className,
  width,
  showCloseDialogIcon = true,
}) => {
  return (
    <>
      <Drawer
        className={className}
        anchor={anchor}
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
        <Paper
          className="right_drawer_paper"
          sx={{
            width: width || 480,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "0px 8px 10px -5px rgba(145 158 171 / 0.2), 0px 16px 24px 2px rgba(145 158 171 / 0.14), 0px 6px 30px 5px rgba(145 158 171 / 0.12)",
          }}
        >
          {showCloseDialogIcon && (
            <IconButton
              aria-label="close"
              onClick={handleDrawer}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
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
          {header && header}

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
            }}
          >
            {children}
          </Box>

          {footer && <Box sx={{ borderTop: "1px solid #eee" }}>{footer}</Box>}
        </Paper>
      </Drawer>
    </>
  );
};
export default MobileSideDrawer;
