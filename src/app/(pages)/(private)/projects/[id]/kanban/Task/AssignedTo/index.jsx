import MyTooltip from "@/components/MyTooltip/MyTooltip";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { getFullName, getInitialsOfString } from "@/utils";
import { Box, Typography } from "@mui/material";

export default function AssignedTo({ assigned_to }) {
  const {isXs} = useResponsiveBreakpoints();
  return (
    <>
      {assigned_to?.length > 4 && (
        <MyTooltip
          content={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: 1,
              }}
            >
              {assigned_to.map((user, index) => {
                const name = getFullName(user?.firstName, user?.lastName);
                return (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <img
                      src={user?.avatar || "/dummyUser.svg"}
                      alt={name}
                      referrerPolicy="no-referrer"
                      style={{
                        width: isXs ? 20 : 24,
                        height:isXs ? 20 : 24,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Typography fontSize={isXs ? 10 : 12} fontWeight={500} color="white">
                      {name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          }
        >
          <Box
            fontSize={isXs ? 10 : 12}
            color={"#007867"}
            width={isXs ? 24 : 28}
            height={isXs ? 24 : 28}
            fontWeight={600}
            ml={"-8px"}
            position={"relative"}
            boxSizing={"content-box"}
            border={"2px solid #FFFFFF"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"50%"}
            overflow={"hidden"}
            sx={{
              background: "#C8FAD6",
            }}
          >
            +{assigned_to?.length - 3}
          </Box>
        </MyTooltip>
      )}
      {assigned_to?.length > 0 && (
        <Box display={"flex"}>
          {assigned_to
            ?.slice(0, assigned_to?.length > 4 ? 3 : 4)
            ?.map((item, index) => {
              const name = `${item?.firstName || ""} ${item?.lastName || ""}`;
              return (
                <MyTooltip key={index} title={name} placement="bottom">
                  <Box
                    width={isXs ? 16 : 20}
                    height={isXs ? 16 : 20}
                    fontSize={isXs ? 13 : 16}
                    fontWeight={600}
                    border={"2px solid #FFFFFF"}
                    boxSizing={"content-box"}
                    ml={"-8px"}
                    position={"relative"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"50%"}
                    overflow={"hidden"}
                    bgcolor={"#637381"}
                    padding={"4px"}
                  >
                    {/* <img
                      src={item?.avatar || "/dummyUser.svg"}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        color: "transparent",
                        textIndent: "100000px",
                        maxWidth: "100%",
                      }}
                    /> */}
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "white",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                      }}
                    >
                      {getInitialsOfString(name)}
                    </Typography>
                  </Box>
                </MyTooltip>
              );
            })}
        </Box>
      )}
    </>
  );
}
