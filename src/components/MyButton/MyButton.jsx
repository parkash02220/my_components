import React from "react";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress } from "@mui/material";
import "./MyButton.style.css";

const sizeStyles = {
  small: {
    padding: "4px 8px",
    fontSize: "12px",
  },
  medium: {
    padding: "8px 16px",
    fontSize: "16px",
  },
  large: {
    padding: "12px 20px",
    fontSize: "18px",
  },
};

export default function MyButton({
  children,
  color = "white",
  variant = "contained",
  size = "medium",
  type = "button",
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  loading = false,
  loadingText,
  loadingIndicator,
  href,
  onClick,
  iconOnly = false,
  backgroundColor = "black",
  hoverBgColor = "rgba(28,37,46,0.8)",
  activeBgColor,
  disabledBgColor,
  disabledTextColor,
  fontSize,
  fontWeight = 700,
  width,
  minWidth = "200px",
  borderRadius = "10px",
  textTransform = "none",
  padding,
  margin = "0",
  boxShadow = "none",
  border,
  className = "",
  sx = {},
  ...props
}) {
  const finalSizeStyles = {
    ...sizeStyles[size],
    ...(iconOnly && {
      padding: size === "small" ? "6px" : size === "large" ? "14px" : "10px",
    }),
  };

  const renderStartIcon = () => {
    if (iconOnly) return null;
    if (loading) {
      return loadingIndicator ? (
        <img
          src={loadingIndicator}
          alt="loading"
          width={20}
          height={20}
          className="spin"
        />
      ) : (
        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
      );
    }
    return startIcon;
  };

  const renderEndIcon = () => {
    if (iconOnly || loading) return null;
    return endIcon;
  };

  return (
    <Box
      width={fullWidth ? "100%" : "fit-content"}
      sx={{ cursor: disabled || loading ? "not-allowed" : "pointer" }}
    >
      <Button
        className={`myButton ${className}`}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        startIcon={renderStartIcon()}
        endIcon={renderEndIcon()}
        onClick={onClick}
        href={href}
        type={type}
        sx={{
          ...finalSizeStyles,
          width: iconOnly ? "auto" : width,
          minWidth: iconOnly ? "auto" : minWidth,
          fontSize,
          fontWeight,
          borderRadius,
          textTransform,
          padding,
          margin,
          boxShadow,
          color: variant === "contained" ? "#fff" : color,
          backgroundColor:
            variant === "contained" ? backgroundColor : "transparent",
          border: variant === "outlined" ? `1px solid ${color}` : border,
          "&:hover": {
            backgroundColor: !disabled && !loading ? hoverBgColor : undefined,
          },
          "&:active": {
            backgroundColor: !disabled && !loading ? activeBgColor : undefined,
          },
          "&.Mui-disabled": {
            backgroundColor:
              variant === "contained"
                ? disabledBgColor || backgroundColor
                : disabledBgColor || "inherit",
            color: disabledTextColor || color,
            opacity: 0.5,
          },
          ...sx,
        }}
        {...props}
      >
        {iconOnly && !loading
          ? startIcon || endIcon
          : loading
          ? loadingText || "Loading..."
          : children}
      </Button>
    </Box>
  );
}

MyButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingIndicator: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  iconOnly: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  activeBgColor: PropTypes.string,
  disabledBgColor: PropTypes.string,
  disabledTextColor: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.string,
  minWidth: PropTypes.string,
  borderRadius: PropTypes.string,
  textTransform: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  boxShadow: PropTypes.string,
  border: PropTypes.string,
  className: PropTypes.string,
  sx: PropTypes.object,
};

MyButton.defaultProps = {
  color: "white",
  variant: "contained",
  size: "medium",
  type: "button",
  fullWidth: false,
  disabled: false,
  fontWeight: 700,
  borderRadius: "10px",
  textTransform: "none",
  margin: "0",
  hoverBgColor: "rgba(28,37,46,0.8)",
  backgroundColor: "black",
  iconOnly: false,
};
