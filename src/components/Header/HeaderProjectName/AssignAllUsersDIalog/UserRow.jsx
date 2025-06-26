import MyButton from "@/components/MyButton/MyButton";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";
import { Box, Typography, useTheme } from "@mui/material";

const UserRow = ({
  user,
  handleAssignToggle,
  isAssigned,
  loadingAssignProjectIds,
  theme,
}) => {
  const { isDownXs } = useResponsiveBreakpoints();
  const fontSize = useResponsiveValue("fontSize");

  return (
    <>
      <Box
        className="assignDialog__contactBox"
        display={"flex"}
        gap={isDownXs ? 1 : 2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          className="cotactBox__avatarBox"
          width={isDownXs ? 30 : 40}
          height={isDownXs ? 30 : 40}
        >
          <AvatarBox src={user?.avatar} />
        </Box>
        <Box
          className="cotactBox__dataBox"
          flex={"1 1 auto"}
          minWidth={0}
          margin={0}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="primary"
            fontWeight={600}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >{`${user?.firstName || ""} ${user?.lastName || ""}`}</Typography>
          <Typography
            variant="secondary"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {user?.email || ""}
          </Typography>
        </Box>
        <Box className="cotactBox__actionBox">
          <MyButton
            backgroundColor="inherit"
            loading={loadingAssignProjectIds?.includes(user?.id)}
            onClick={() => handleAssignToggle(user?.id, isAssigned)}
            fontWeight={700}
            sx={{ height: "30px" }}
            borderRadius="8px"
            padding={"4px"}
            fontSize={isDownXs ? "10px" : "13px"}
            minWidth="64px"
            variant="text"
            color={isAssigned ? "#00A76F" : theme.palette.primary.main}
            hoverBgColor={
              isAssigned ? "rgba(0,167,111,0.08)" : "rgba(145,158,171,0.08)"
            }
          >
            <img
              src={isAssigned ? "/assingedIcon.svg" : "/assignPlusIcon.svg"}
              alt="assign"
              style={{
                width: isDownXs ? "12px" : "16px",
                height: isDownXs ? "12px" : "16px",
                marginRight: "4px",
              }}
            />
            {isAssigned ? "Assigned" : "Assign"}
          </MyButton>
        </Box>
      </Box>
    </>
  );
};
export default UserRow;

const AvatarBox = ({ src, alt = "user" }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    overflow="hidden"
    fontSize="1.25rem"
    sx={{
      width: { xs: 30, sm: 40 },
      height: { xs: 30, sm: 40 },
    }}
  >
    <img
      src={src || "/dummyUser.svg"}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        color: "transparent",
      }}
    />
  </Box>
);
