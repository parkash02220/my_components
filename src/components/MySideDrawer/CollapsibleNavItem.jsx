import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { SingleNavItem } from "./SingleNavItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
export const CollapsibleNavItem = ({
  item,
  open,
  isExpanded,
  onToggle,
  selectedSegment,
  onClick,
  loadMoreRef,
  onOpenMenu,
  onCloseMenu,
}) => {
  return (
    <>
      <ListItemButton
        onMouseEnter={(e) => {
          if (!open) {
            onOpenMenu(e, item);
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            onCloseMenu();
          }
        }}
        onClick={(e) => {
          if (open) {
            onToggle();
          } else {
            // Open floating menu
            onOpenMenu(e, item);
          }
        }}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          background: isExpanded ? "#919EAB14" : "#FFFFFF",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? "12px" : "auto",
            justifyContent: "center",
          }}
        >
          {item.imgSrc ? (
            <Box
              width={24}
              height={24}
              sx={{
                background: isExpanded ? "#1C252E" : "#637381",
                mask: `url(${item.imgSrc}) center center / contain no-repeat`,
              }}
            ></Box>
          ) : (
            item.icon
          )}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          sx={{ opacity: open ? 1 : 0 }}
          primaryTypographyProps={{
            fontSize: "14px",
            fontWeight: 500,
            color: selectedSegment === item.segment ? "#00A76F" : "#637381",
          }}
        />
        {open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
        {!open && (
          <Box>
            <KeyboardArrowRightIcon sx={{ color: "#1C252E" }} />
          </Box>
        )}
      </ListItemButton>

      {open ? (
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ pl: 3, position: "relative", pb: 1 }}
        >
          <Box
            sx={{
              top: "0px",
              left: "0px",
              width: "2px",
              position: "absolute",
              background: "#EDEFF2",
              bottom: "25px",
              ml: 3,
            }}
          />
          <Box
            sx={{
              maxHeight: 300,
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "8px",
              pl: 1.5,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <List component="div" disablePadding>
              {item.children.map((child, idx) => {
                if (child.type === "loader") {
                  return (
                    <ListItemButton
                      key={idx}
                      sx={{ justifyContent: "center", py: 1 }}
                    >
                      <img src="/iosLoader.gif" width="30px" height="30px" />
                    </ListItemButton>
                  );
                }

                if (child.type === "message") {
                  return (
                    <ListItem key={idx}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#919EAB",
                          fontStyle: "italic",
                          px: 2,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {child.title}
                      </Typography>
                    </ListItem>
                  );
                }

                if (child.type === "loadMoreRef") {
                  return (
                    <Box
                      key={idx}
                      ref={loadMoreRef}
                      sx={{ height: 1, width: "100%" }}
                    />
                  );
                }

                return (
                  <SingleNavItem
                    key={idx}
                    item={child}
                    open={open}
                    selectedSegment={selectedSegment}
                    onClick={() => onClick(child)}
                    isCollapsible
                    sx={{
                      minHeight: 36,
                      pt: "4px",
                      pb: "4px",
                    }}
                  />
                );
              })}
            </List>
          </Box>
        </Collapse>
      ) : null}
    </>
  );
};
