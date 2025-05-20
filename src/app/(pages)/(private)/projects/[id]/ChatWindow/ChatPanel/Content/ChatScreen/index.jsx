import { Box } from "@mui/material";

import MessageInputBox from "./MessageInputBox";
import MessageBox from "./MessageBox";

const ChatScreen = () => {
    return <>
    <Box minWidth={0} display={'flex'} flex={'1 1 auto'} flexDirection={'column'}>
        <MessageBox />
        <MessageInputBox />
    </Box>
    </>
}
export default ChatScreen;