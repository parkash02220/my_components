"use client";
import React from "react";
import { ListItem, Typography, Box } from "@mui/material";
import SearchNavItem from "./SearchNavItem";
import { SingleNavItem } from "./SingleNavItem";
import { CollapsibleNavItem } from "./CollapsibleNavItem";

export default function NavItemList({
  NAVIGATION,
  open,
  searchValue,
  handleSearchValueChange,
  handleSearchClear,
  expandedItems,
  selectedDrawerItem,
  handleDrawerItemClick,
  handleExpandToggle,
  loadMoreRef,
  handleOpenMenu,
  handleCloseMenu,
}) {
  return NAVIGATION.map((item, index) => {
    if (item.type === "header") {
      return open ? (
        <ListItem key={index} sx={{ pl: 1 }}>
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
      ) : null;
    }

    if (item.type === "searchField") {
      return (
        <React.Fragment key={index}>
          <SearchNavItem
            open={open}
            value={searchValue}
            onChange={handleSearchValueChange}
            handleSearchClear={handleSearchClear}
          />
        </React.Fragment>
      );
    }

    if (item.type === "message") {
      return open ? (
        <ListItem key={index}>
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
            {item.title}
          </Typography>
        </ListItem>
      ) : null;
    }

    if (item.type === "item") {
      return (
        <SingleNavItem
          key={index}
          item={item}
          open={open}
          onClick={() => handleDrawerItemClick(item)}
        />
      );
    }

    if (item.type === "collapsible") {
      return (
        <CollapsibleNavItem
          key={index}
          item={item}
          open={open}
          isExpanded={expandedItems[item.segment]}
          onToggle={() => handleExpandToggle(item.segment)}
          selectedSegment={selectedDrawerItem}
          onClick={handleDrawerItemClick}
          loadMoreRef={loadMoreRef}
          onOpenMenu={handleOpenMenu}
          onCloseMenu={handleCloseMenu}
        />
      );
    }

    return null;
  });
}
