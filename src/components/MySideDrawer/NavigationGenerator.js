import routes from "@/routes";
import { FolderOpenIcon } from "lucide-react";

export const staticNavItems = [
  // { type: "header", title: "Projects" },
  { type: "item", segment: "addproject", title: "+ Project" },
  { type: "searchField" },
];

export function NavigationGenerator({
  isAdmin,
  projects,
  loadingAllProjects,
  isInitialFetchDone,
  isSearchLoading,
  hasMore,
}) {
  const NAVIGATION = [...staticNavItems];
  if(isAdmin === undefined){
    NAVIGATION.push([{ type: "loader" }]);
    return
  } 
  const role = isAdmin ? "admin" : "user";
   
  routes.forEach((route) => {
    if (!route.roles.includes(role)) return;
    if (!isAdmin && route.segment === "projects") {
      return;
    }
    if (route.type === "item") {
      NAVIGATION.push({
        ...route,
      });
    }

    if (route.type === "collapsible") {
      const childrenFnOrArray = route.children;

      let children = [];

      if (typeof childrenFnOrArray === "function") {
        if (!isInitialFetchDone || isSearchLoading) {
          children = [{ type: "loader" }];
        } else if (projects.length > 0) {
          children = childrenFnOrArray(projects);

          if (loadingAllProjects) {
            children.push({ type: "loader" });
          } else if (hasMore) {
            children.push({ type: "loadMoreRef" });
          }
        }
      } else {
        children = childrenFnOrArray;
      }

      if (
        route.segment === "projects" &&
        !isInitialFetchDone &&
        !loadingAllProjects &&
        projects?.length === 0
      ) {
        children = [{ type: "message", title: "No projects found" }];
      }

      NAVIGATION.push({
        ...route,
        children,
      });
    }
  });

    if (!isAdmin && isInitialFetchDone && projects?.length > 0) {
      const projectItems = projects.map((project) => ({
        type: "item",
        segment: `projects/${project.id}`,
        title: project.name,
        icon: <FolderOpenIcon />,
      }));
  
      NAVIGATION.push(...projectItems);
  
      if (hasMore) {
        NAVIGATION.push({ type: "loadMoreRef" });
      }
    }

  return NAVIGATION;
}
