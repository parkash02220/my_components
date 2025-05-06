import { useAppContext } from "@/context/AppContext";
import NotificatoinMsg from "../NotificatoinMsg";
import { Box, Typography } from "@mui/material";

const index = () => {
    const { state } = useAppContext();
    const { notifications, loading } = state;
    const { loadingNotifications } = loading;
    const activeNotifications = notifications[notifications?.tab];
    return <>
     <Box className="UnreadNotifications__container" height={"100%"}>
        {loadingNotifications ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/iosLoader.gif"
              alt="loading"
              style={{ width: "40px", height: "40px" }}
            />
          </Box>
        ) : !loadingNotifications && notifications?.length === 0 ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
          >
            <Box>
              <Typography
                fontSize={20}
                fontWeight={600}
                color="#1C252E"
                textAlign={"center"}
              >
                You're all caught up!
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={14} color="#637381" textAlign={"center"}>
                No notifications at the moment — we'll let you know when
                something new comes in.
              </Typography>
            </Box>
          </Box>
        ) : (
          activeNotifications?.map((notification, i) => (
            <Box key={i} width="100%">
              <NotificatoinMsg notification={notification} type="unread"/>
            </Box>
          ))
        )}
      </Box>
    </>
}
export default index;