
const userDrawerRoutes = [
    {
      type: "item",
      segment: "/user/profile",
      title: "My Profile",
      icon: {src:"/profileIcon.svg",alt:"profile"},
    },
    {
      type: "item",
      segment: "/user/security",
      title: "Security",
      icon: {src:"/securityIcon.svg",alt:"security"},
    },
    {
        type: "item",
        segment: "/user/settings",
        title: "Account settings",
        icon: {src:"/settingIcon.svg",alt:"account settings"},
      },
  ];

export default userDrawerRoutes;
