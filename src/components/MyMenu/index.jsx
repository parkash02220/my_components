import { Box, Menu, MenuItem, Typography } from "@mui/material";

const MyMenu = ({
  type,
  menuAnchorEl,
  onClose,
  activeMenuItem,
  options,
  handleDrawerItemClick,
  loadMoreRef,
  cancelCloseMenu,
}) => {
  if (type === "side_drawer") {
    return (
      <>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={onClose}
          MenuListProps={{
            onMouseEnter: cancelCloseMenu,
            onMouseLeave: onClose,
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          transitionDuration={0}
          slotProps={{
            root: {
              sx: {
                zIndex: 798,
                ml: 2,
                "& .MuiList-root": {
                  p: 0,
                  pt: "4px",
                  pb: "4px",
                },
              },
            },
            paper: {
              sx: {
                maxHeight: 300,
                overflowY: "auto",
                borderRadius: "8px",
                minWidth: "180px",
                padding: "4px",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              },
            },
          }}
        >
          {activeMenuItem?.children?.map((child, idx) => {
            console.log("::child", child);
            if (child.type === "loader") {
              return (
                <MenuItem
                  key={idx}
                  disableRipple
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img src="/iosLoader.gif" width="30px" height="30px" />
                </MenuItem>
              );
            }
            if (child.type === "message") {
              return (
                <MenuItem key={idx} disabled>
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", color: "#919EAB" }}
                  >
                    {child.title}
                  </Typography>
                </MenuItem>
              );
            }
            if (child.type === "loadMoreRef") {
              return (
                <Box
                  key={idx}
                  ref={loadMoreRef}
                  sx={{ height: "1px", width: "100%" }}
                />
              );
            }

            return (
              <MenuItem
                key={idx}
                onClick={() => {
                  handleDrawerItemClick(child);
                  onClose();
                }}
                sx={{
                  p: "0px 8px",
                  color: "#637381",
                  fontSize: 14,
                  fontWeight: 500,
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                {child.title}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  } else if (type === "list_user") {
    return (
      <>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={onClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          transitionDuration={0}
          PaperProps={{
            sx: {
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
          MenuListProps={{
            sx: {
              padding: "4px",
              backgroundColor: "#fff",
              minWidth:140,
            },
          }}
        >
          {options?.map((item, idx) => (
            <MenuItem
              key={idx}
              onClick={item?.onClick}
              sx={{
                p: "6px 8px",
                color: "#637381",
                fontSize: 14,
                fontWeight: 500,
                height: "34px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                mb:'4px',
                gap:2,
                "&:hover": {
                  backgroundColor: "#f4f6f8",
                },
              }}
            >
              <img
                src={item?.icon}
                alt="icon"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
  return <></>;
};
export default MyMenu;
