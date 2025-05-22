import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { getFullName } from "@/utils";
import { Box, Typography } from "@mui/material";

export default function AssignedToData({ assigned_to }) {
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
                      src={user.avatar || '/dummyUser.svg'}
                      alt={name}
                       referrerPolicy="no-referrer"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Typography fontSize={12} fontWeight={500} color="white">
                      {name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          }
        >
          <Box
            fontSize={12}
            color={"#007867"}
            width={24}
            height={24}
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
                    width={24}
                    height={24}
                    fontSize={16}
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
                  >
                    <img
                      src={item?.avatar || '/dummyUser.svg'}
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
                    />
                  </Box>
                </MyTooltip>
              );
            })}
        </Box>
      )}
    </>
  );
}
