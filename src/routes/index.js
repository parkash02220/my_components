import { FolderOpenIcon, UserIcon } from "lucide-react";

export const staticNavItems = [
  // { type: "header", title: "Projects" },
  { type: "item", path: "addproject", title: "+ Project", roles: ["admin"], },
  { type: "searchField" },
];


const drawerRoutes = [
  {
    type: "collapsible",
    path: "projects",
    title: "Projects",
    icon: <FolderOpenIcon />,
    roles: ["admin"],
    children: (projects) =>
      projects.map((project) => ({
        type: "item",
        path: `projects/${project.id}`,
        title: project.name,
        projectId: project.id,
      })),
  },
  {
    type: "collapsible",
    path: "users",
    title: "Users",
    icon: <UserIcon />,
    roles: ["admin"],
    children: [
      { type: "item", path: "users/list-users", title: "List Users" },
      { type: "item", path: "users/create-user", title: "Create User" },
    ],
  },
];

export default drawerRoutes;