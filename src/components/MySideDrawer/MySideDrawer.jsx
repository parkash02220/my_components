"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import CreateProjectDialog from "@/components/MySideDrawer/CreateProjectDialog.jsx";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  Layers as LayersIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ApiCall } from "@/utils/ApiCall";
import useAllProjects from "@/hooks/projects/useAllProjects";
import useCreateProject from "@/hooks/projects/useCreateProject";
import { useAppContext } from "@/context/AppContext";
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
  },
  left: 0,
  right: "auto",
  position: "fixed",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: "hidden",
  boxSizing: "border-box",
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MySideDrawer({ children }) {
  const [open, setOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingProjects, fetchAllProjects] = useAllProjects();
  const { state } = useAppContext();
  const { projects } = state;
  const [loading, isCreated, createProject] = useCreateProject();

  const router = useRouter();
  const pathname = usePathname();

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
    segment: `projects/${project?._id}`,
    title: project?.name,
    icon: <FolderOpenIcon />,
  }));

  const NAVIGATION = [
    { kind: "projects", title: "Projects" },
    { segment: "addproject", title: "+ Project" },
    ...projectNavItems,
  ];

  const renderNavItems = () =>
    NAVIGATION.map((item, index) => {
      if (item?.kind === "header") {
        return open ? (
          <ListItem key={index}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{
                fontSize: "12px",
                color: "#919EAB",
                fontWeight: 700,
                "&:hover": {
                  color: "black",
                  cursor: "pointer",
                },
              }}
            >
              {item?.title}
            </Typography>
          </ListItem>
        ) : null;
      }

      if (item?.kind === "divider") {
        return <Divider key={index} />;
      }

      const hasChildren = !!item?.children?.length;
      const isExpanded = expandedItems[item?.segment];

      const navItem = (
        <>
          <ListItemButton
            key={item?.title}
            onClick={() =>
              hasChildren
                ? handleExpandToggle(item.segment)
                : handleDrawerItemClick(item)
            }
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              background:
                selectedDrawerItem === item?.segment ? "#ECF8F4" : "#FFFFFF",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? "12px" : "auto",
                justifyContent: "center",
              }}
            >
              {item?.icon}
            </ListItemIcon>
            <ListItemText
              primary={item?.title}
              sx={{ opacity: open ? 1 : 0 }}
              primaryTypographyProps={{
                fontSize: "14px",
                fontWeight: 500,
                color:
                  selectedDrawerItem === item?.segment ? "#00A76F" : "#637381",
              }}
            />
            {hasChildren &&
              open &&
              (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {/* Children */}
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child, childIndex) => (
                  <ListItemButton
                    key={childIndex}
                    sx={{
                      pl: open ? 4 : 2,
                      justifyContent: open ? "initial" : "center",
                    }}
                    onClick={() => handleDrawerItemClick(child.segment)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? "12px" : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {child?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={child?.title}
                      sx={{ opacity: open ? 1 : 0 }}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color:
                          selectedDrawerItem === child?.segment
                            ? "#00A76F"
                            : "#637381",
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </>
      );

      return open ? (
        <ListItem
          key={index}
          disablePadding
          sx={{ flexDirection: "column", alignItems: "stretch" }}
        >
          {navItem}
        </ListItem>
      ) : (
        <Tooltip title={item?.title} placement="right" key={index}>
          <ListItem disablePadding>{navItem}</ListItem>
        </Tooltip>
      );
    });

  const handleCreateProject = async (name) => {
    await createProject(name);
    fetchAllProjects();
  };

  return (
    <>
      <Box className="createProjectDialog">
        <CreateProjectDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreateProject}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ justifyContent: open ? "space-between" : "center" }}>
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
              }}
            >
              <img
                src="/drawerLogo.svg"
                alt="logo"
                style={{ height: "100%" }}
              />
            </IconButton>
            <IconButton color="inherit" onClick={toggleDrawer} edge="start">
              {/* {open ? <ChevronLeftIcon /> : <MenuIcon />} */}
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            {/* {open && (
    <Typography variant="h6" noWrap>
      Combined Dashboard
    </Typography>
  )} */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <List>{renderNavItems()}</List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <DrawerHeader /> */}
          {children || (
            <Typography>
              This is the main content area. You can replace this with routes or
              other layout content.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
