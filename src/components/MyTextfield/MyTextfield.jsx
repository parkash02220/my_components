import React from "react";
import PropTypes from "prop-types";
import { TextField, Box, CircularProgress, Typography } from "@mui/material";

const MyTextField = ({
  value,
  onChange,
  inputProps,
  label = "Enter text",
  placeholder = "",
  variant = "outlined",
  fullWidth = false,
  width,
  minWidth = "100px",
  size = "medium",
  disabled = false,
  loading = false,
  error = false,
  helperText = "",
  type = "text",
  multiline = false,
  rows,
  maxRows,
  minRows,
  InputProps,
  InputLabelProps,
  sx = {},
  borderRadius = "8px",
  boxShadow = "none",
  borderColor = "black",
  labelFontSize = "14px",
  inputFontSize = "14px",
  labelColor = "black",
  errorBorderColor = "red",
  helperTextFontSize = "12px",
  padding,
  customEndAdornment,
  customStartAdornment,
  className,
  customLabelSx,
  required = false,
  requiredColor = "black",
  shrink,
  hoverBorderColor,
  autoComplete,
  background,
  placeholderColor,
  fontWeight,
  acitveBorder,
  border,
  activeLabelColor,
  labelFontWeight,
  maxHeight,
  boxMargin,
  color,
  ...props
}) => {
  const shrinkTypes = [
    "text",
    "number",
    "password",
    "email",
    "tel",
    "url",
    "search",
  ];
  const shouldShrink = shrinkTypes.includes(type) ? undefined : true;
  return (
    <Box sx={{ width: fullWidth ? "100%" : width || "fit-content" }} m={boxMargin || 0}>
      {/* {label && (
        <Typography
          variant="body2"
          sx={{
            fontSize: labelFontSize,
            color: error ? errorBorderColor : disabled ? "#a9a9a9" : labelColor,
            marginBottom: "6px",
            ...customLabelSx,
          }}
        >
          {label} {required && <span style={{ color: requiredColor }}>*</span>}
        </Typography>
      )} */}
      <TextField
        value={value}
        label={label}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        disabled={disabled}
        error={error}
        type={type}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        autoComplete={autoComplete}
        helperText={error && helperText}
        inputProps={inputProps} 
        InputProps={{
          ...InputProps,
          style: {
            borderRadius,
            padding,
            fontSize: inputFontSize,
            maxHeight:maxHeight,
          },
          startAdornment: customStartAdornment,
          endAdornment: loading ? (
            <CircularProgress size={20} sx={{ marginRight: "10px" }} />
          ) : (
            customEndAdornment
          ),
        }}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: shrink || shouldShrink,
          style: {
            fontSize: labelFontSize,
            fontWeight:labelFontWeight,
          },
        }}
        sx={{
          width,
          minWidth,
          ...sx,
          "& .MuiInputLabel-asterisk": {
            color: requiredColor,
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: placeholderColor,
            fontWeight:fontWeight,
          },
          "& .MuiOutlinedInput-root": {
            color:color || "black",
            border:border,
            borderRadius,
            boxShadow,
            background: background,
            fontWeight:fontWeight,
            ...(border === "none"
            ? {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }
          : {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? errorBorderColor : borderColor,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? errorBorderColor : hoverBorderColor || borderColor,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: acitveBorder || `1px solid ${borderColor}`,
              },
            }),
          },
          "& .MuiInputLabel-root": {
            color: disabled ? "#a9a9a9" : labelColor,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? errorBorderColor : activeLabelColor || labelColor,
          },
          "& .MuiFormHelperText-root": {
            fontSize: helperTextFontSize,
            color: error ? errorBorderColor : "#a9a9a9",
          },
          "& .Mui-disabled": {
            cursor: "not-allowed !important",
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px white inset',
            WebkitTextFillColor: color || 'black',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }}
        className={`myTextField ${className}`}
        {...props}
      />
    </Box>
  );
};

MyTextField.defaultProps = {
  label: "Enter text",
  variant: "outlined",
  fullWidth: false,
  size: "medium",
  type: "text",
  borderRadius: "8px",
  boxShadow: "none",
  borderColor: "black",
  labelFontSize: "14px",
  inputFontSize: "14px",
  labelColor: "black",
  errorBorderColor: "red",
  helperTextFontSize: "12px",
  requiredColor: "black",
  shrink: "",
  minWidth: "100px",
};

export default MyTextField;
