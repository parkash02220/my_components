import { FolderOpenIcon, UserIcon } from "lucide-react";

export const staticNavItems = [
  // { type: "header", title: "Projects" },
  { type: "item", segment: "addproject", title: "+ Project", roles: ["admin"], },
  { type: "searchField" },
];


const drawerRoutes = [
  {
    type: "collapsible",
    segment: "projects",
    title: "Projects",
    icon: <FolderOpenIcon />,
    roles: ["admin"],
    children: (projects) =>
      projects.map((project) => ({
        type: "item",
        segment: `projects/${project.id}`,
        title: project.name,
        projectId: project.id,
      })),
  },
  {
    type: "collapsible",
    segment: "users",
    title: "Users",
    icon: <UserIcon />,
    roles: ["admin"],
    children: [
      { type: "item", segment: "users/list-users", title: "List Users" },
      { type: "item", segment: "users/create-user", title: "Create User" },
    ],
  },
];

export default drawerRoutes;