import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";

const ChatPanel = () => {
    const [isExpanded,setIsExpanded] = useState(true);
    const toggleExpand = () => {
      setIsExpanded((pre)=> !pre);
    }
    return <>
    <Box sx={{minWidth:0,display:'flex',flex:'1 1 auto',flexDirection:'column'}}>
        <Header toggleExpand={toggleExpand}/>
        <Content isExpanded={isExpanded}/>
    </Box>
    </>
}
export default ChatPanel;