import { Box } from "@mui/material";
import UserDIrectoryItem from "./UserDIrectoryItem";
import React from "react";
import { useChatContext } from "@/context/Chat/ChatContext";

const UserDirectory = ({ isExpanded,handleChatStart,onlineUsers }) => {
  const {chatWindow} = useChatContext().state;
 const {users,groups} = chatWindow;
 console.log(":::chat window",chatWindow)
  return (
    <>
      <Box
        minWidth={0}
        minHeight={0}
        flex={"1 1 auto"}
        display={"flex"}
        flexDirection={"column"}
        pb={1}
        position={"relative"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Box
          height={"100%"}
          width={"100%"}
          minHeight={0}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box pb={1} display={"flex"} flexDirection={"column"}>
            {
              groups?.map((group)=>{
                return <React.Fragment key={group?.id}>
                 <UserDIrectoryItem type={"group__chat"} isExpanded={isExpanded} group={group} handleChatStart={handleChatStart} />
                 </React.Fragment>
              })
            }
             {
              users?.map((user)=>{
                return <React.Fragment key={user?.id}>
                 <UserDIrectoryItem isExpanded={isExpanded} user={user} handleChatStart={handleChatStart} onlineUsers={onlineUsers}/>
                 </React.Fragment>
              })
            }
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default UserDirectory;
