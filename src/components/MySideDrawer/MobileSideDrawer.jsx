import { Box, Drawer, List, ListItem, Paper } from "@mui/material";

const MobileSideDrawer = ({
  open,
  handleDrawer,
  className,
  width,
  projects,
  isLoadMoreLoading,
  hasMore,
}) => {
  return (
    <>
      <Drawer
        className={className}
        anchor="left"
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
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <List sx={{ padding: "8px" }}>
              <ListItem sx={{ pl: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "12px",
                    color: "#919EAB",
                    fontWeight: 700,
                    "&:hover": { color: "black", cursor: "pointer" },
                  }}
                >
                  {item.title}
                </Typography>
              </ListItem>
              <ListItem sx={{ pl: 1 }}>
              <SearchNavItem
              open={open}
              value={searchValue}
              onChange={handleSearchValueChange}
              handleSearchClear={handleSearchClear}
            />
            </ListItem>
              {projects?.length > 0 && hasMore && !isLoadMoreLoading && (
                <Box ref={loadMoreRef} style={{ height: 1 }} />
              )}
            </List>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};
export default MobileSideDrawer;
