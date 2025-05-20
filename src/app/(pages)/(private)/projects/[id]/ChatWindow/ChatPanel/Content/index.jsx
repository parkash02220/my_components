import { Box } from "@mui/material";
import ChatScreen from "./ChatScreen";
import ChatDetails from "./ChatDetails";

const Content = ({isExpanded}) => {
    return <>
    <Box minHeight={0} flex={'1 1 auto'} display={'flex'} >
       <ChatScreen />
      <ChatDetails isExpanded={isExpanded} />
    </Box>
    </>
}
export default Content;