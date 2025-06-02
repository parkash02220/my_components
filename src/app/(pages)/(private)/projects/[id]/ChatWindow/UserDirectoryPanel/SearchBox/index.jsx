import MySearch from "@/components/MySearch/MySearch";
import { Box } from "@mui/material";
import { useState } from "react";

const SearchBox = ({handleSearchClear,handleSearchValueChange,searchValue}) => {

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
            placeholder="Search contacts..."
            hoverBorderColor={"#1C252E"}
            focusedBorder="2px solid #1C252E"
            value={searchValue}
            onChange={handleSearchValueChange}
            onClear={handleSearchClear}
          />
        </Box>
      </Box>
    </>
  );
};
export default SearchBox;
