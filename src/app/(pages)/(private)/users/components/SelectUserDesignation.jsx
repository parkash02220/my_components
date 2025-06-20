import MySelect from "@/components/MySelect/MySelect";
import MySelectVariant from "@/components/MySelect/MySelectVarient";
import { Box } from "@mui/material";

const SelectUserDesignation = ({ designations, setDesignations }) => {
  return (
    <>
      <Box width={"100%"}>
        <MySelectVariant
          selectedValue={designations}
          setSelectedValue={setDesignations}
          type={"multi_all_designations"}
          multiple={true}
          label="Select designation"
        />
      </Box>
    </>
  );
};
export default SelectUserDesignation;
