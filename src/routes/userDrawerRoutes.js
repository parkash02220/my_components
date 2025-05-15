
const userDrawerRoutes = [
    {
      type: "item",
      segment: "/profile",
      title: "My Profile",
      icon: {src:"/profileIcon.svg",alt:"profile"},
    },
    {
      type: "item",
      segment: "/security",
      title: "Security",
      icon: {src:"/securityIcon.svg",alt:"security"},
    },
    {
        type: "item",
        segment: "/settings",
        title: "Account settings",
        icon: {src:"/settingIcon.svg",alt:"account settings"},
      },
  ];

export default userDrawerRoutes;
