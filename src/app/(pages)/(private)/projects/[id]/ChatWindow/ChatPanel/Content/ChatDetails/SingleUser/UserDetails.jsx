import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
import useResponsiveBreakpoints from "@/hooks/common/useResponsiveBreakpoints";
import { getDesignationName, getFullName } from "@/utils";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

const UserDetails = ({ user }) => {
  const {isXs} = useResponsiveBreakpoints();
  const { allDesignations } = useOrganizationContext()?.state;
  const designation = useMemo(() => {
    return getDesignationName(allDesignations,user?.userProfile?.designation);
  }, [allDesignations, user]);
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        pt={5}
        pb={5}
      >
        <Box
          width={isXs ? 75 : 96}
          height={isXs ? 75 : 96}
          mb={2}
          overflow={"hidden"}
          borderRadius={"50%"}
          flexShrink={0}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            src={user?.avatar || "/dummyUser.svg"}
            alt="user"
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              textIndent: "10000px",
            }}
          />
        </Box>
        <Typography variant="title1" fontWeight={600}>
          {getFullName(user?.firstName, user?.lastName)}
        </Typography>
        <Typography variant="secondary" mt={"4px"}>
          {designation}
        </Typography>
      </Box>
    </>
  );
};
export default UserDetails;
