import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";

const ChatPanel = ({chatWindow,chatType,selectedDirectoryItem}) => {
    const [isExpanded,setIsExpanded] = useState(true);
    const toggleExpand = () => {
      setIsExpanded((pre)=> !pre);
    }
    console.log("::chat type in chatpanel",chatType)
    return <>
    <Box sx={{minWidth:0,display:'flex',flex:'1 1 auto',flexDirection:'column'}}>
        <Header toggleExpand={toggleExpand} chatWindow={chatWindow} chatType={chatType} selectedDirectoryItem={selectedDirectoryItem}/>
        <Content isExpanded={isExpanded}/>
    </Box>
    </>
}
export default ChatPanel;