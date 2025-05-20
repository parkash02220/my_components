import { Box, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UserWithStatus from "../../../../components/UserWithStatus";
const RoomDetails = () => {
  const roomData = [
    {
      label: {
        src: "/locationIcon.svg",
        alt: "location",
      },
      value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
    },
    {
      label: {
        src: "/mobileNumberIcon.svg",
        alt: "location",
      },
      value: "999999999",
    },
    {
      label: {
        src: "/emailIcon.svg",
        alt: "location",
      },
      value: "parkash@gmail.com",
    },
    {
        label: {
          src: "/locationIcon.svg",
          alt: "location",
        },
        value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
      },
      {
        label: {
          src: "/mobileNumberIcon.svg",
          alt: "location",
        },
        value: "999999999",
      },
      {
        label: {
          src: "/emailIcon.svg",
          alt: "location",
        },
        value: "parkash@gmail.com",
      },
      {
        label: {
          src: "/locationIcon.svg",
          alt: "location",
        },
        value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
      },
      {
        label: {
          src: "/mobileNumberIcon.svg",
          alt: "location",
        },
        value: "999999999",
      },
      {
        label: {
          src: "/emailIcon.svg",
          alt: "location",
        },
        value: "parkash@gmail.com",
      },
      {
        label: {
          src: "/locationIcon.svg",
          alt: "location",
        },
        value: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",
      },
      {
        label: {
          src: "/mobileNumberIcon.svg",
          alt: "location",
        },
        value: "999999999",
      },
      {
        label: {
          src: "/emailIcon.svg",
          alt: "location",
        },
        value: "parkash@gmail.com",
      },
  ];
  return (
    <>
      <Box
        sx={{
          background: "#F4F6F8",
          p: "8px 12px 8px 20px",
          height: 40,
          position: "relative",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
          flexShrink:0,
        }}
      >
        <Typography color="#637381" fontWeight={700} fontSize={12}>
          IN ROOM (5)
        </Typography>
        <KeyboardArrowRightIcon
          sx={{
            color: "#637381",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            transform: "rotate(90deg)",
          }}
        />
      </Box>
      <Box minHeight={0} display={'flex'} flexDirection={'column'} flex={'1 1 auto'}>
        <Box display={"flex"} flexDirection={"column"} sx={{
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
        }}>
          {roomData?.map((data, i) => {
            return (
              <React.Fragment key={i}>
               <RoomRow />
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
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
        <UserWithStatus width={40} height={40} />
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
            {"suraj mishra"}
          </Typography>
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            color="#637381"
            fontSize={12}
          >
            {"suraj mishra"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
