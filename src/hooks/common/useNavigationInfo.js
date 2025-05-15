import routes from "@/routes";
import userDrawerRoutes from "@/routes/userDrawerRoutes";

export function useNavigationInfo({path, projects = [],type=""}) {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  let selectedChild = null;
  let selectedParent = null;

  if(type==="userDrawerRoutes"){
    for (const route of userDrawerRoutes) {
    console.log("::routes",route)
  }
  return { parent: selectedParent, child: selectedChild };
  }

  for (const route of routes) {
    if (route.type === "collapsible" && route.children) {
      const children = typeof route.children === "function"
        ? route.children(projects)
        : route.children;

      const matchedChild = children.find(
        (child) =>
          child.segment === normalizedPath ||
          normalizedPath.startsWith(child.segment + "/")
      );

      if (matchedChild) {
        selectedParent = route;
        selectedChild = matchedChild;
        break;
      }
    } else {
      if (
        route.segment === normalizedPath ||
        normalizedPath.startsWith(route.segment + "/")
      ) {
        selectedChild = route;
        break;
      }
    }
  }

  return { parent: selectedParent, child: selectedChild };
}
