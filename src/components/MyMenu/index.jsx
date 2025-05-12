import { Box, Menu, MenuItem, Typography } from "@mui/material";

const MyMenu = ({type,menuAnchorEl,onClose,activeMenuItem,handleDrawerItemClick,loadMoreRef}) => {
    if(type === "side_drawer"){
        return <>
         <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={onClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                style: {
                  maxHeight: 300,
                  overflowY: "auto",
                  borderRadius: 8,
                },
              }}
            >
              {activeMenuItem?.children?.map((child, idx) => {
                console.log("::child",child)
                if (child.type === "loader") {
                  return (
                    <MenuItem key={idx} disableRipple>
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
                      sx={{ height: '1px', width: "100%",background:"red" }}
                    />
                  );
                }

                return (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      handleDrawerItemClick(child);
                      handleCloseMenu();
                    }}
                  >
                    {child.title}
                  </MenuItem>
                );
              })}
            </Menu>
        </>
    }
    return <>
    </>
}
export default MyMenu;