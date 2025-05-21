import { Box, Typography } from "@mui/material";
import UserWithStatus from "../../../components/UserWithStatus";

const GroupUsers = ({isExpanded,group,handleChatStart}) => {
    const avatar = group?.participants?.slice(0,2)?.map((user)=> user?.avatar || "");
    const handleItemClick = () => {
        handleChatStart(group,"group__chat");
    }

    return <>
        <Box
        onClick={handleItemClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          minWidth: 0,
          width: "100%",
          paddingInline: "20px",
          pt: "12px",
          pb: "12px",
          gap: 2,
          ":hover": {
            background: "rgba(145 158 171 / 0.08)",
          },
        }}
      >
        <UserWithStatus type={"group__chat"} avatar={avatar}/>
        {
          isExpanded && (
            <>
             <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontWeight={600}
            fontSize={14}
            color="#1C252E"
          >
           {group?.name || ""}
          </Typography>
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            color="#637381"
            fontSize={14}
          >
            You:hello
          </Typography>
        </Box>
        <Box
          display={"flex"}
          alignSelf={"stretch"}
          alignItems={"flex-end"}
          flexDirection={"column"}
        >
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontSize={12}
            color="#919EAB"
            mb={"12px"}
          >
            an hour
          </Typography>
          <Typography
            width={8}
            height={8}
            borderRadius={"50%"}
            bgcolor={"#00B8D9"}
          />
        </Box>
            </>
          )
        }
      </Box>
    </>
}
export default GroupUsers;