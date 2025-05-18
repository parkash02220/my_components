import routes from "@/routes";


export function getNavigationInfo(path) {
  const flatRoutes = [];

  routes.forEach((route) => {
    if (route.type === "collapsible" && route.children) {
      const children = typeof route.children === "function" ? [] : route.children;
      flatRoutes.push(...children);
    } else {
      flatRoutes.push(route);
    }
  });

  return flatRoutes.find((r) => r.path === path) || null;
}