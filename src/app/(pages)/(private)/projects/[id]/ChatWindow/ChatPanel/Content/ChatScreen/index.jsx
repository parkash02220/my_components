import { Box } from "@mui/material";
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

const ChatScreen = ({selectedDirectoryItem,chatType,loadingStartChat}) => {
    return <>
    <Box minWidth={0} display={'flex'} flex={'1 1 auto'} flexDirection={'column'}>
        <MessageBox selectedDirectoryItem={selectedDirectoryItem} chatType={chatType} loadingStartChat={loadingStartChat}/>
        <MessageInputBox selectedDirectoryItem={selectedDirectoryItem}/>
    </Box>
    </>
}
export default ChatScreen;