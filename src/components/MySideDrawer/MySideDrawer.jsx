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
import MyButton from "../MyButton/MyButton";
import useLogout from "@/hooks/common/useLogout";
import { SingleNavItem } from "./SingleNavItem";
import { CollapsibleNavItem } from "./CollapsibleNavItem";
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
    segment: `projects/${project?._id}`,
    title: project?.name,
    icon: <FolderOpenIcon />,
  }));

  const NAVIGATION = [
    { type: "header", title: "Projects" },
    { type: "item", segment: "addproject", title: "+ Project" },
    // Spread out all project items as top-level items
    ...(projects?.map((project) => ({
      type: "item",
      segment: `projects/${project?._id}`,
      title: project?.name,
      icon: <FolderOpenIcon />,
    })) || []),
  ];
  const renderNavItems = () => {
    return NAVIGATION.map((item, index) => {
      switch (item.type) {
        case "header":
          return open ? (
            <ListItem key={index}>
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

        case "divider":
          return <Divider key={index} />;

        case "collapsible":
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

        case "item":
          return (
            <SingleNavItem
              key={index}
              item={item}
              open={open}
              selectedSegment={selectedDrawerItem}
              onClick={() => handleDrawerItemClick(item)}
            />
          );

        default:
          return null;
      }
    });
  };

  const handleCreateProject = async (name) => {
    await createProject(name);
    fetchAllProjects();
  };

  if (!hasMounted) return null;

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
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          width={"calc(100% - 300px)"}
        >
          {/* <DrawerHeader /> */}
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"end"}
            height={60}
            alignItems={"flex-start"}
            className="logout_buttonBox"
          >
            <MyButton onClick={logoutUser} loading={loadingLogout}>
              Logout
            </MyButton>
          </Box>
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
