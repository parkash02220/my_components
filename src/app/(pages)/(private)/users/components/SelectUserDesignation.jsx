import MySelect from "@/components/MySelect/MySelect";
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
        <MySelect
          minWidth="0px"
          fullWidth={true}
          label="Designation"
          options={roleList}
          multiple={true}
          onChange={handleRoleSelect}
          value={selectedRoles}
          border={`undefined`}
          focusedBorder={`2px solid #1C252E`}
        />
      </Box>
    </>
  );
};
export default SelectUserDesignation;
