import MySearch from "@/components/MySearch/MySearch";
import { Box } from "@mui/material";
import { useState } from "react";

const SearchBox = () => {
    const [value,setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const handleSearchClear = () => {
        setValue('');
    }
  return (
    <>
      <Box
        sx={{
          p: "0px 20px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: 0,
            mt: "20px",
            width: "100%",
          }}
        >
          <MySearch
            fullWidth={true}
            minWidth="100%"
            borderRadius="8px"
            placeholder="Seach contacts..."
            hoverBorderColor={"#1C252E"}
            focusedBorder="2px solid #1C252E"
            value={value}
            onChange={onChange}
            onClear={() => handleSearchClear()}
          />
        </Box>
      </Box>
    </>
  );
};
export default SearchBox;
