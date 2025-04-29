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

import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import useAllProjects from "@/hooks/projects/useAllProjects";
import useCreateProject from "@/hooks/projects/useCreateProject";
import { useAppContext } from "@/context/AppContext";
import useLogout from "@/hooks/projects/user/useLogout";
import { SingleNavItem } from "./SingleNavItem";
import { CollapsibleNavItem } from "./CollapsibleNavItem";
import SearchNavItem from "./SearchNavItem";
import ConfirmationPopup from "../ConfirmationPopup";

export default function MySideDrawer({ open, setOpen }) {
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const [expandedItems, setExpandedItems] = useState({});
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loadingProjects, fetchAllProjects } = useAllProjects();
  const { state } = useAppContext();
  const { projects } = state;
  const [loading, isCreated, createProject] = useCreateProject();
  const { loadingLogout, logoutUser } = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    const parts = pathname.split("/");
    const selectedSegment = parts.length > 1 ? parts[1] : "";
    setSelectedDrawerItem(selectedSegment);
  }, [pathname]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

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

    setSelectedDrawerItem(segment);
    router.push(`/${segment}`);
  };
  const projectNavItems = projects?.map((project) => ({
    segment: `projects/${project?.id}`,
    title: project?.name,
    icon: <FolderOpenIcon />,
  }));

  const NAVIGATION = [
    { type: "header", title: "Projects" },
    { type: "item", segment: "addproject", title: "+ Project" },
    { type: "searchField" },
  ];

  if (loadingProjects && (!projects || projects.length === 0)) {
  } else if (!loadingProjects && projects?.length === 0) {
    NAVIGATION.push({ type: "message", title: "No projects found" });
  } else if (projects?.length > 0) {
    NAVIGATION.push(
      ...projects.map((project) => ({
        type: "item",
        segment: `projects/${project?.id}`,
        title: project?.name,
        icon: <FolderOpenIcon />,
      }))
    );
  }
  const renderNavItems = () => {
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
            <SearchNavItem open={open} />
            {loadingProjects && (!projects || projects.length === 0) && (
              <ListItem sx={{ justifyContent: "center", py: 1 }}>
                {/* <Loader /> */}
                <img src="/iosLoader.gif" width={"40px"} height={"40px"} />
              </ListItem>
            )}
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
          />
        );
      }

      return null;
    });
  };

  const handleCreateProject = async (name) => {
    await createProject(name);
    fetchAllProjects();
  };

  const handleLogoutPopupOpen = () => {
    setLogoutPopupOpen(true);
  };

  const handleLogoutPopupClose = () => {
    setLogoutPopupOpen(false);
  };
  const handleUserLogout = async () => {
    await logoutUser();
    handleLogoutPopupClose();
  };
  if (!hasMounted) return null;

  return (
    <>
      <ConfirmationPopup
        title={"Logout"}
        handleClose={handleLogoutPopupClose}
        open={logoutPopupOpen}
        submitAction={handleUserLogout}
        loading={loadingLogout}
      />
      <Box className="createProjectDialog">
        <CreateProjectDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreateProject}
        />
      </Box>
      <Box sx={{ display: "flex", position: "relative" }}>
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          edge="start"
          sx={{
            position: "absolute",
            top: 20,
            left: open ? `${drawerWidth + 12}px` : `${miniDrawerWidth + 12}px`,
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

        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ justifyContent: open ? "space-between" : "center" }}>
            <IconButton
              sx={{
                width: open ? "80px" : "50px",
                height: "40px",
                padding: "0px",
              }}
            >
              <img
                src="/websperoLogo.svg"
                alt="logo"
                style={{ height: "100%", width: "100%" }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <List sx={{ padding: open ? "8px 16px" : "8px" }}>
            {renderNavItems()}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
