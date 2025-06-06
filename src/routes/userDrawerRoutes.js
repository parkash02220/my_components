const userDrawerRoutes = [
  {
    type: "item",
    path: "/user/profile?tab=general",
    title: "My Profile",
    icon: { src: "/profileIcon.svg", alt: "profile" },
  },
  {
    type: "item",
    path: "/user/profile?tab=security",
    title: "Security",
    icon: { src: "/securityIcon.svg", alt: "security" },
  },
  // {
  //     type: "item",
  //     path: "/user/settings",
  //     title: "Account settings",
  //     icon: {src:"/settingIcon.svg",alt:"account settings"},
  //   },
];

export default userDrawerRoutes;
