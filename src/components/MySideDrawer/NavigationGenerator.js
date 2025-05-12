import { FolderOpenIcon } from "lucide-react";

export function NavigationGenerator({
    isAdmin,
    projects,
    loadingAllProjects,
    isInitialFetchDone,
    isSearchLoading,
    hasMore,
  }) {
    let NAVIGATION = [];
  
    if (isAdmin) {
      NAVIGATION = [
        { type: "header", title: "Projects" },
        { type: "item", segment: "addproject", title: "+ Project" },
        { type: "searchField" },
        {
          type: "collapsible",
          segment: "projects",
          title: "Projects",
          icon: <FolderOpenIcon />,
          children: (() => {
            if (!isInitialFetchDone) {
              return [{ type: "loader" }];
            }
  
            if (projects?.length === 0) {
              return [{ type: "message", title: "No projects found" }];
            }
  
            const projectItems = projects.map((project) => ({
              type: "item",
              segment: `projects/${project?.id}`,
              title: project?.name,
            }));
  
            if (loadingAllProjects) {
              projectItems.push({ type: "loader" });
            } else if (hasMore) {
              projectItems.push({ type: "loadMoreRef" });
            }
  
            return projectItems;
          })(),
        },
        {
          type: "collapsible",
          segment: "users",
          title: "Users",
          imgSrc:
            "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-user.svg",
          children: (() => {
            const usersItems = [
              { name: "List", path: "list-users" },
              { name: "create", path: "create-user" },
            ].map((user) => ({
              type: "item",
              segment: `users/${user?.path}`,
              title: user?.name,
            }));
  
            return usersItems;
          })(),
        },
      ];
    } else {
      NAVIGATION = [
        { type: "header", title: "Projects" },
        { type: "item", segment: "addproject", title: "+ Project" },
        { type: "searchField" },
      ];
  
      const shouldShowNoProjects =
        isInitialFetchDone && !loadingAllProjects && projects?.length === 0;
  
      if (isSearchLoading) {
        // Optionally add a loading indicator here
      } else if (shouldShowNoProjects) {
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
    }
  
    return NAVIGATION;
  }
  