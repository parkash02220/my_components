"use client";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  drawerWidth,
  miniDrawerWidth,
  drawerTransitionDuration,
  drawerEasing,
} from "@/components/MySideDrawer/MySideDrawerStyleComponents.jsx";
import * as actions from '@/context/action';
import React, { useEffect, useMemo, useRef, useState } from "react";
import CreateProjectDialog from "@/components/MySideDrawer/CreateProjectDialog.jsx";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import useCreateProject from "@/hooks/projects/useCreateProject";
import { useAppContext } from "@/context/AppContext";
import useGetAllProjects from "@/hooks/projects/useGetAllProjects";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import MobileSideDrawer from "./MobileSideDrawer";
import { NavigationGenerator } from "./NavigationGenerator";
import MyMenu from "../MyMenu";
import NavItemList from "./NavItemList";

export default function MySideDrawer({ open, setOpen }) {
  const {
    allProjects,
    isSearchLoading,
    isLoadMoreLoading,
    searchValue,
    handleSearchValueChange,
    loadMoreRef,
    loadingAllProjects,
    getAllProjectsFromBackend,
    hasMore,
    handleSearchClear,
    isInitialFetchDone,
  } = useGetAllProjects();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeSegment, setActiveSegment] = useState(null);
  const closeTimeoutRef = useRef(null);
  
  const handleOpenMenu = (event, item) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setMenuAnchorEl(event.currentTarget);
    setActiveSegment(item.segment);
  };
  
  const handleDelayedCloseMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMenuAnchorEl(null);
      setActiveSegment(null);
    }, 200);
  };
  
  const cancelCloseMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const [expandedItems, setExpandedItems] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { state,dispatch } = useAppContext();
  const { projects, activeUser } = state;
  const { isAdmin } = activeUser;
  const [loading, isCreated, createProject] = useCreateProject();
  const router = useRouter();
  const pathname = usePathname();
  // const [hasMounted, setHasMounted] = useState(false);
  const { isXs, isLg, isMd } = useBreakpointFlags();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const handleMobileDrawerOpen = () => {
    setMobileDrawerOpen(true);
  };
  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };
  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleExpandToggle = (segment) => {
    setExpandedItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  const handleDrawerItemClick = (item) => {
    const { segment } = item;
    if (segment === "addproject") {
      setDialogOpen(true);
      return;
    }
    router.push(`/${segment}`);
    if (isMd) handleMobileDrawerClose();

  };

  const NAVIGATION = NavigationGenerator({
    isAdmin,
    projects,
    loadingAllProjects,
    isInitialFetchDone,
    isSearchLoading,
    hasMore,
  });

  const activeMenuItem = useMemo(() => {
    return NAVIGATION.find((item) => item.segment === activeSegment);
  }, [NAVIGATION, activeSegment]);

  const handleCreateProject = async (name, users) => {
    await createProject(name, users);
  };
  // if (!hasMounted) return null;
  return (
    <>
      <Box className="createProjectDialog">
        <CreateProjectDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreateProject}
          loadingCreateProject={loading}
        />
      </Box>
      <Box sx={{ display: "flex", position: "relative" }}>
        {!isMd ? (
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              position: "absolute",
              top: 20,
              left: open
                ? `${drawerWidth + 12}px`
                : `${miniDrawerWidth + 12}px`,
              transform: "translateX(-50%)",
              zIndex: 801,
              backgroundColor: "white",
              cursor: "pointer",
              color: "#637381",
              border: "1px solid rgba(145,158,171,0.12)",
              transition: `left ${drawerTransitionDuration}ms ${drawerEasing},transisiton ${drawerTransitionDuration}ms ${drawerEasing} `,
              boxShadow: 2,
              padding: "0px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <img
              src="/toggleDrawerIcon.svg"
              alt="drawer toggle icon"
              style={{
                transition: `transform ${drawerTransitionDuration}ms ${drawerEasing}`,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                width: "100%",
                height: "100%",
              }}
            />
          </IconButton>
        ) : null}

        <CssBaseline />
        <AppBar position="fixed" open={open} ismd={isMd} isxs={isXs}>
          <Toolbar sx={{ justifyContent: open ? "space-between" : "center" }}>
            {!isMd ? (
              <IconButton
              onClick={()=>router.push("/home")}
              sx={{
                '&:hover':{
                  background:'transparent',
                }
              }}
              >
                <img
                  src="/websperoLogo.svg"
                  alt="logo"
                  style={{height: "40px",  width: open ? "80px" : "50px", }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleMobileDrawerOpen}
                sx={{
                  width: "24px",
                  height: "24px",
                  padding: "0px",
                }}
              >
                <img
                  src="/hamburger.svg"
                  alt="logo"
                  style={{ height: "100%", width: "100%" }}
                />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {!isMd ? (
          <Drawer variant="permanent" open={open}>
            <DrawerHeader />
            <List sx={{ padding: open ? "8px 16px" : "8px" }}>
              <NavItemList
                NAVIGATION={NAVIGATION}
                open={open}
                searchValue={searchValue}
                handleSearchValueChange={handleSearchValueChange}
                handleSearchClear={handleSearchClear}
                expandedItems={expandedItems}
                handleDrawerItemClick={handleDrawerItemClick}
                handleExpandToggle={handleExpandToggle}
                loadMoreRef={loadMoreRef}
                handleOpenMenu={handleOpenMenu}
                handleCloseMenu={handleDelayedCloseMenu}
              />
              {(!isInitialFetchDone || loadingAllProjects) && !isAdmin && (
                <ListItem sx={{ justifyContent: "center", py: 1 }}>
                  <img src="/iosLoader.gif" width="30px" height="30px" />
                </ListItem>
              )}
              {projects?.length > 0 &&
                hasMore &&
                !loadingAllProjects &&
                !isAdmin && <Box ref={loadMoreRef} style={{ height: 1 }} />}
            </List>
            <MyMenu
              menuAnchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleDelayedCloseMenu}
              cancelCloseMenu={cancelCloseMenu}
              activeMenuItem={activeMenuItem}
              handleDrawerItemClick={handleDrawerItemClick}
              type={"side_drawer"}
              loadMoreRef={loadMoreRef}
            />
          </Drawer>
        ) : (
          <MobileSideDrawer
            open={mobileDrawerOpen}
            handleDrawer={handleMobileDrawerClose}
            width={300}
          >
            <List sx={{ padding: "16px" }}>
              <NavItemList
                NAVIGATION={NAVIGATION}
                open={mobileDrawerOpen}
                searchValue={searchValue}
                handleSearchValueChange={handleSearchValueChange}
                handleSearchClear={handleSearchClear}
                expandedItems={expandedItems}
                handleDrawerItemClick={handleDrawerItemClick}
                handleExpandToggle={handleExpandToggle}
                loadMoreRef={loadMoreRef}
                handleOpenMenu={handleOpenMenu}
                handleCloseMenu={handleDelayedCloseMenu}
              />
              {(!isInitialFetchDone || loadingAllProjects) && !isAdmin && (
                <ListItem sx={{ justifyContent: "center", py: 1 }}>
                  <img src="/iosLoader.gif" width="30px" height="30px" />
                </ListItem>
              )}
              {projects?.length > 0 && hasMore && !loadingAllProjects && !isAdmin && (
                <Box ref={loadMoreRef} style={{ height: 1 }} />
              )}
            </List>
          </MobileSideDrawer>
        )}
      </Box>
    </>
  );
}
