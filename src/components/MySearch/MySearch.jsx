import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

const SearchBox = styled(Box)(
  ({
    bordercolor,
    borderradius,
    backgroundcolor,
    focusedborder,
    focusedbordercolor,
    hoverbordercolor,
    disabled,
  }) => ({
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    border: `1px solid ${bordercolor || "#ccc"}`,
    borderRadius: borderradius || "4px",
    cursor: disabled ? "not-allowed" : "text",
    backgroundColor: backgroundcolor || "#fff",
    transition: "border-color 0.3s ease",
    "&:focus-within": {
      border : focusedborder || `1px solid ${focusedbordercolor || "#1976d2"}`,
    },
    "&:hover": {
      borderColor: hoverbordercolor || bordercolor || "#aaa",
    },
  })
);

const StyledInputBase = styled(InputBase)(
  ({ inputfontsize, inputtextcolor, disabled }) => ({
    flex: 1,
    cursor: disabled ? "not-allowed" : "text",
    fontSize: inputfontsize || "16px",
    color: inputtextcolor || "#000",
    "& input": {
      padding: "8px",
      outline: "none",
      cursor: disabled ? 'not-allowed' : 'auto',
    },
  })
);

export default function MySearch({
  value,
  onChange,
  onClear,
  placeholder = "Search…",
  helperText = "",
  error = false,
  disabled = false,
  searchIconColor,
  clearIconColor,
  onSearch,
  showClearButton = true,
  width,
  minWidth = "300px",
  fullWidth = false,
  borderColor = "#ccc",
  errorBorderColor,
  borderRadius = "4px",
  backgroundColor = "#fff",
  focusedBorderColor = "#1976d2",
  inputFontSize = "16px",
  inputTextColor = "#000",
  helperTextColor = "#666",
  errorTextColor = "red",
  wrapperStyle = {},
  iconStyle = {},
  clearIconStyle = {},
  helperTextStyle = {},
  hoverBorderColor,
  focusedBorder,
  loading,
  ...props
}) {
  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : width || "fit-content",
        minWidth: fullWidth ? "auto" : minWidth,
        ...wrapperStyle,
      }}
      {...props}
    >
      <SearchBox
        bordercolor={ error ? errorBorderColor || 'red' : borderColor || 'inherit'}
        borderradius={borderRadius}
        backgroundcolor={backgroundColor}
        focusedborder={focusedBorder}
        focusedbordercolor={focusedBorderColor}
        sx={{ cursor: disabled ? "not-allowed" : "text" }}
        hoverbordercolor={hoverBorderColor}
      >
        <IconButton
          aria-label="search"
          disabled={disabled}
          onClick={onSearch}
          sx={{
            color: searchIconColor,
            cursor: disabled ? "not-allowed" : "pointer",
            ...iconStyle,
          }}
        >
          <SearchIcon />
        </IconButton>
        <StyledInputBase
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search", disabled: disabled }}
          disabled={disabled}
          inputfontsize={inputFontSize}
          inputtextcolor={inputTextColor}
        />
        {showClearButton && value && !disabled && (
          <IconButton
            aria-label="clear"
            onClick={onClear}
            sx={{
              color: clearIconColor,
              cursor: disabled ? "not-allowed" : "pointer",
              ...clearIconStyle,
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
        {
          loading && (
            <CircularProgress size={20} sx={{ mr: "8px" }} />
          )
        }
      </SearchBox>
      {error && helperText && (
        <Box
          sx={{
            marginTop: "4px",
            fontSize: "12px",
            color: error ? errorTextColor : helperTextColor,
            ...helperTextStyle,
          }}
        >
          {helperText}
        </Box>
      )}
    </Box>
  );
}

MySearch.defaultProps = {
  value: "",
  onClear: () => {},
  placeholder: "Search…",
  helperText: "",
  error: false,
  disabled: false,
  searchIconColor: "black",//#666
  clearIconColor: "black",//#666
  showClearButton: true,
  borderColor: "black",//#ccc
  borderRadius: "10px",
  backgroundColor: "#fff",
  focusedBorderColor: "#1976d2",
  inputFontSize: "16px",
  inputTextColor: "#000",
  helperTextColor: "#666",
  errorTextColor: "red",
  wrapperStyle: {},
  iconStyle: {},
  clearIconStyle: {},
  helperTextStyle: {},
  loading:false,
};
