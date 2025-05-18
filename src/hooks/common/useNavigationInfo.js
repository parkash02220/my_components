
import { useMemo } from "react";

import { usePathname } from "next/navigation";
import userDrawerRoutes from "@/routes/userDrawerRoutes";
import drawerRoutes from "@/routes";


function flattenRoutes(routes, projects = []) {
  return routes.flatMap((route) => {
    if (route.type === "collapsible") {
      const children = typeof route.children === "function"
        ? route.children(projects)
        : route.children || [];

      return [
        { ...route, isParent: true },
        ...children.map(child => ({
          ...child,
          parent: route,
        }))
      ];
    }
    return [route];
  });
}

export function useNavigationInfo({ projects = [] } = {}) {
  const pathname = usePathname();
  console.log("::use pathname",pathname)
  const allRoutes = useMemo(() => {
    return [
      ...flattenRoutes(drawerRoutes, projects),
      ...flattenRoutes(userDrawerRoutes),
    ];
  }, [projects]);

  const matchedChild = useMemo(() => {
    return allRoutes.find(route =>
      pathname === `/${route.path}` || pathname.startsWith(`${route.path}`)
    );
  }, [allRoutes, pathname]);

  return {
    parent: matchedChild?.parent || null,
    child: matchedChild || null,
  };
}
