import routes, { staticNavItems } from "@/routes";
import { FolderOpenIcon } from "lucide-react";

export function NavigationGenerator({
  isAdmin,
  projects = [],
  loadingAllProjects,
  isInitialFetchDone,
  isSearchLoading,
  hasMore,
}) {
  if (isAdmin === undefined) {
    return [{ type: "loader" }];
  }

  const role = isAdmin ? "admin" : "user";
  const NAVIGATION = [];

  const filteredStaticItems = staticNavItems.filter(item => {
    return !item.roles || item.roles.includes(role);
  });

  NAVIGATION.push(...filteredStaticItems);

  for (const route of routes) {
    if (!route.roles.includes(role)) continue;

    if (!isAdmin && route.path === "projects") continue;

    if (route.type === "item") {
      NAVIGATION.push({ ...route });
    }

    if (route.type === "collapsible") {
      let children = [];

      if (typeof route.children === "function") {
        if (!isInitialFetchDone || isSearchLoading) {
          children = [{ type: "loader" }];
        } else if (projects.length > 0) {
          children = route.children(projects);

          if (loadingAllProjects) {
            children.push({ type: "loader" });
          } else if (hasMore) {
            children.push({ type: "loadMoreRef" });
          }
        }

        if (
          route.path === "projects" &&
          isInitialFetchDone &&
          !loadingAllProjects &&
          projects.length === 0
        ) {
          children = [{ type: "message", title: "No projects found" }];
        }
      } else {
        children = route.children;
      }

      NAVIGATION.push({
        ...route,
        children,
      });
    }
  }

  if (!isAdmin && isInitialFetchDone) {
    if(projects.length > 0){
      const projectItems = projects.map((project) => ({
        type: "item",
        path: `projects/${project.id}`,
        title: project.name,
        icon: <FolderOpenIcon />,
      }));
  
      NAVIGATION.push(...projectItems);
  
      if (hasMore) {
        NAVIGATION.push({ type: "loadMoreRef" });
      }
    }else if(projects.length === 0){
      NAVIGATION.push({ type: "message", title: "No projects found" });
    }
  }

  return NAVIGATION;
}
