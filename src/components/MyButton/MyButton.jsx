import React from "react";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress } from "@mui/material";
import "./MyButton.style.css";
export default function MyButton({
  children,
  color = "white",
  variant = "contained",
  size = "medium",
  fullWidth,
  disabled,
  startIcon,
  endIcon,
  onClick,
  href,
  type = "button",
  loading,
  loadingText,
  fontSize,
  width,
  minWidth = "200px",
  borderRadius = "10px",
  textTransform = "none",
  padding,
  margin = "0",
  boxShadow = "none",
  loadingIndicator,
  className,
  hoverBgColor = "rgba(28,37,46,0.8)",
  activeBgColor,
  backgroundColor,
  fontWeight = 700,
  disabledBgColor,
  disabledTextColor,
  iconOnly = false,
  sx,
  ...props
}) {
  const sizeStyles = {
    small: {
      padding: iconOnly ? "6px" : "4px 8px",
      fontSize: "12px",
    },
    medium: {
      padding: iconOnly ? "10px" : "8px 16px",
      fontSize: "16px",
    },
    large: {
      padding: iconOnly ? "14px" : "12px 20px",
      fontSize: "18px",
    },
  };
  return (
    <Box
      width={fullWidth ? "100%" : "fit-content"}
      sx={{ cursor: disabled || loading ? "not-allowed" : "auto" }}
    >
      <Button
        className={`myButton ${className || ""}`}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        startIcon={
         iconOnly ? null :  !loading ? (
            startIcon
          ) : loadingIndicator ? (
            <img
              src={loadingIndicator}
              alt="loading indicator"
              width={20}
              height={20}
              className="spin"
            />
          ) : (
            <CircularProgress size={20} color="inherit" sx={{ mr: "8px" }} />
          )
        }
        endIcon={iconOnly ? null : !loading ? endIcon : null}
        onClick={onClick}
        href={href}
        type={type}
        sx={{
          ...sizeStyles[size],
          width: iconOnly ? "auto" : width,
          minWidth: iconOnly ? "auto" : minWidth,
          fontSize,
          borderRadius,
          textTransform,
          padding,
          margin,
          boxShadow,
          color: variant === "contained" ? "#ffffff" : color,
          fontWeight,
          backgroundColor:
            variant === "contained" ? color : backgroundColor || 'inherit',
          border: variant === "outlined" ? `1px solid ${color}` : "none",
          "&:hover": {
            backgroundColor: disabled || loading ? undefined : hoverBgColor,
          },
          "&:active": {
            backgroundColor: disabled || loading ? undefined : activeBgColor,
          },
          "&.Mui-disabled": {
            backgroundColor:
              variant === "contained"
                ? color
                : disabledBgColor || backgroundColor || 'inherit',
            color:
              variant === "contained" ? "#ffffff" : disabledTextColor || color,
            opacity: disabled ? "0.5" : "1",
          },
          ...sx,
        }}
        {...props}
      >
       {iconOnly && !loading ? startIcon || endIcon : loading ? loadingText || "Loading..." : children}
      </Button>
    </Box>
  );
}

MyButton.defaultProps = {
  color: "white",
  variant: "contained",
  size: "medium",
  type: "button",
  borderRadius: "10px",
  textTransform: "none",
  margin: "0",
  // backgroundColor: "",
  fontWeight: 700,
  hoverBgColor: "rgba(28,37,46,0.8)",
  iconOnly:false,
};
