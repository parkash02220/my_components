const { Box, Typography } = require("@mui/material")
const { default: UserWithStatus } = require("../../components/UserWithStatus");
const { default: MyTooltip } = require("@/components/MyTooltip/MyTooltip");
const { getFullName } = require("@/utils");

const GroupUsersDetails = ({chatType,groupDetails}) => {
    const users = groupDetails?.participants || [];
    return <>
     <Box display={'flex'} flexDirection={'row-reverse'} justifyContent={'flex-end'}>
     {users?.length > 3 && (
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
              {users.map((user, index) => {
                const name = getFullName(user?.firstName, user?.lastName);
                return (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <img
                      src={user.avatar || '/dummyUser.svg'}
                      alt={name}
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
            width={32}
            height={32}
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
            +{users?.length - 3}
          </Box>
        </MyTooltip>
      )}
      {users?.length > 0 && (
        <Box display={"flex"}>
          {users
            ?.slice(0, users?.length > 3 ? 2 : 3)
            ?.map((item, index) => {
              const name = `${item?.firstName || ""} ${item?.lastName || ""}`;
              return (
                <MyTooltip key={index} title={name} placement="bottom">
                  <Box
                    width={32}
                    height={32}
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
                    flexShrink={0}
                  >
                    <img
                      src={item?.avatar || '/dummyUser.svg'}
                      alt="avatar"
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
    </Box>
    </>
}
export default GroupUsersDetails;