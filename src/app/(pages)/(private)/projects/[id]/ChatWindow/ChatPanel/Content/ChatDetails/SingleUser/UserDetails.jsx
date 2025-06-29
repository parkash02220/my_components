import { useOrganizationContext } from "@/context/Organization/OrganizationContext";
import { getDesignationName, getFullName } from "@/utils";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

const UserDetails = ({ user }) => {
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
          width={96}
          height={96}
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
        <Typography variant="h6" fontWeight={600} fontSize={20} color="#1C252E">
          {getFullName(user?.firstName, user?.lastName)}
        </Typography>
        <Typography color="#637381" fontSize={14} mt={"4px"}>
          {designation}
        </Typography>
      </Box>
    </>
  );
};
export default UserDetails;
