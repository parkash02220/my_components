import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SingleNavItem = ({ item, open, onClick }) => {
  const pathname = usePathname();
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const {title}  = item;
  const titleName = title?.trim()?.split(" ").map((word,index)=> {
    if(index===0){
      return word?.charAt(0)?.toUpperCase() + word?.slice(1);
    }
    return word;
  })?.join(" ");
  useEffect(() => {
    const parts = pathname.split("/");
    let selectedSegment = parts.length > 1 ? parts[1] : "";
    if(selectedSegment?.startsWith("projects")){
       selectedSegment += '/' + parts[2];
    }
    setSelectedDrawerItem(selectedSegment);
  }, [pathname]);
  const isSelected = selectedDrawerItem === item.segment;
  const isAddProject = item.segment === "addproject"
  const content = (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: 48,
        flexDirection:open?"row":"column",
        justifyContent: open ? "initial" : "center",
        alignItems:open ? "" : "center",
        px: isAddProject ? 0 : 2.5,
        background: isSelected ? "rgba(0,167,111,0.16)" : "#FFFFFF",
        borderRadius:"8px",
        '&::hover':{
          background:"rgba(145,158,171,0.08)",
        }
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? "12px" : "0px",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={titleName || ""}
        sx={{
          //  opacity: open ? 1 : 0 
          }}
        primaryTypographyProps={{
          fontSize: open ? isAddProject ? "18px" : "14px" : isAddProject ? "12px" : "10px",
          fontWeight: isAddProject ? 700 : 500,
          color: isSelected ? "#00A76F" : "#637381",
          textAlign:isAddProject?"center":"",
        }}
      />
    </ListItemButton>
  );

  console.log(":selected segment",selectedDrawerItem);

  return open ? (
    <ListItem disablePadding>{content}</ListItem>
  ) : (
    <Tooltip title={item.title} placement="right">
      <ListItem disablePadding>{content}</ListItem>
    </Tooltip>
  );
};
