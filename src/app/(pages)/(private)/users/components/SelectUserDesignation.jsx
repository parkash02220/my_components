import MySelect from "@/components/MySelect/MySelect";
import MySelectVariant from "@/components/MySelect/MySelectVarient";
import { Box } from "@mui/material";
import { useState } from "react";

const SelectUserDesignation = () => {
  const roleList = [
    { id: 1, value: "user", label: "User" },
    { id: 1, value: "admin", label: "Admin" },
  ];
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleRoleSelect = (e) => {
    const selected = e.target.value;
    setSelectedRoles(selected);
  };
  return (
    <>
      <Box width={"100%"}>
        <MySelectVariant
          selectedValue={selectedRoles}
          setSelectedValue={setSelectedRoles}
          type={"multi_all_designations"}
          multiple={true}
          label="Select designation"
        />
      </Box>
    </>
  );
};
export default SelectUserDesignation;
