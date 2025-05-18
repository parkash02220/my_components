import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";
import { capitalizeFirstLetter } from "@/utils";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SingleNavItem = ({
  item,
  open,
  onClick,
  isCollapsible,
  sx = {},
}) => {
  const router = useRouter();
  const { isXs } = useBreakpointFlags();
  const pathname = usePathname();
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  useEffect(() => {
    const cleanPath = pathname.replace(/^\//, "");
    setSelectedDrawerItem(cleanPath);
  }, [pathname]);

  const isSelected = selectedDrawerItem === item.path;
  const isAddProject = item.path === "addproject";
  const content = (
    <ListItemButton
      onMouseEnter={() => {
        if (item.path !== "addproject") {
          router.prefetch(`/${item.path}`);
        }
      }}
      onClick={onClick}
      sx={{
        minHeight: 40,
        flexDirection: open ? "row" : "column",
        justifyContent: open ? "initial" : "center",
        alignItems: open ? "" : "center",
        px: isAddProject ? 0 : 2.5,
        background: isSelected ? "rgba(0,167,111,0.16)" : "#FFFFFF",
        borderRadius: "8px",
        "&::hover": {
          background: "rgba(145,158,171,0.08)",
        },
        position: "relative",
        ...sx,
      }}
    >
      {isCollapsible && (
        <Box
          sx={{
            position: "absolute",
            left: "-12px",
            top: "50%", // vertically center
            transform: "translateY(-50%)",
            width: "12px",
            height: "12px",
            background: "#EDEFF2",
            mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 50% 50% / 100% no-repeat`,
          }}
        />
      )}
      {item?.icon ? (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? "12px" : "0px",
            justifyContent: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
      ) : null}
      <ListItemText
        primary={capitalizeFirstLetter(item?.title) || ""}
        sx={
          {
            //  opacity: open ? 1 : 0
          }
        }
        primaryTypographyProps={{
          fontSize: open
            ? isAddProject
              ? "18px"
              : "14px"
            : isAddProject
            ? "12px"
            : "10px",
          fontWeight: isAddProject ? 700 : 500,
          color: isSelected ? "#00A76F" : "#637381",
          textAlign: isAddProject ? "center" : "",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
    </ListItemButton>
  );

  return open ? (
    <ListItem disablePadding sx={{ pt: "4px" }}>
      {content}
    </ListItem>
  ) : (
    <Tooltip title={item.title} placement="right">
      <ListItem disablePadding>{content}</ListItem>
    </Tooltip>
  );
};
