import { Box, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UserWithStatus from "../../../../components/UserWithStatus";
import { getFullName } from "@/utils";
const RoomDetails = ({ users = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleIsExpanded = () => {
    setIsExpanded((pre) => !pre);
  };
  return (
    <>
      <Box
        onClick={toggleIsExpanded}
        sx={{
          background: "#F4F6F8",
          p: "8px 12px 8px 20px",
          height: 40,
          position: "relative",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Typography color="#637381" fontWeight={700} fontSize={12}>
          {`IN ROOM (${users?.length})`}
        </Typography>
        <KeyboardArrowRightIcon
          sx={{
            color: "#637381",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </Box>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        flex={"1 1 auto"}
        sx={{ overflow: "auto" }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {users?.map((user) => {
              return (
                <React.Fragment key={user?.id}>
                  <RoomRow user={user} />
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      </Collapse>
    </>
  );
};
export default RoomDetails;

export const RoomRow = ({ user }) => {
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
          p: "8px 16px",
        }}
      >
        <UserWithStatus width={40} height={40} avatar={user?.avatar} />
        <Box
          flex={"1 1 auto"}
          minWidth={0}
          ml={2}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontWeight={600}
            color="#1C252E"
            fontSize={14}
          >
            {getFullName(user?.firstName, user?.lastName)}
          </Typography>
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            color="#637381"
            fontSize={12}
          >
            {user?.role}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
