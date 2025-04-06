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
    borderColor,
    borderRadius,
    backgroundColor,
    focusedBorderColor,
    hoverBorderColor,
    disabled,
  }) => ({
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    border: `1px solid ${borderColor || "#ccc"}`,
    borderRadius: borderRadius || "4px",
    cursor: disabled ? "not-allowed" : "text",
    backgroundColor: backgroundColor || "#fff",
    transition: "border-color 0.3s ease",
    "&:focus-within": {
      borderColor: focusedBorderColor || "#1976d2",
    },
    "&:hover": {
      borderColor: hoverBorderColor || borderColor || "#aaa",
    },
  })
);

const StyledInputBase = styled(InputBase)(
  ({ inputFontSize, inputTextColor, disabled }) => ({
    flex: 1,
    cursor: disabled ? "not-allowed" : "text",
    fontSize: inputFontSize || "16px",
    color: inputTextColor || "#000",
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
        borderColor={ error ? errorBorderColor || 'red' : borderColor || 'inherit'}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        focusedBorderColor={focusedBorderColor}
        sx={{ cursor: disabled ? "not-allowed" : "text" }}
        hoverBorderColor={hoverBorderColor}
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
          inputFontSize={inputFontSize}
          inputTextColor={inputTextColor}
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
