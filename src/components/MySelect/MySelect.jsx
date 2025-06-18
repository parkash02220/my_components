import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Checkbox,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import { typography } from "storybook/internal/theming";

export default function MySelect({
  value,
  onChange,
  label = "Select",
  options = [],
  fullWidth,
  disabled,
  size,
  variant,
  borderRadius = "10px",
  minWidth = "300px",
  padding = "0px",
  labelFontSize = "16px",
  selectFontSize = "14px",
  menuItemFontSize = "14px",
  boxShadow,
  placeholder,
  loading,
  helperText = "",
  error,
  menuBackgroundColor,
  menuHoverColor,
  border,
  focusedBorder,
  hoverBorder,
  borderColor = "black",
  labelColor = "black",
  className,
  listBoxClasssName,
  optionItemClassName,
  hoverBorderColor,
  color,
  required,
  requiredColor,
  multiple = false,
  menuDesignType = "checkbox",
  activeLabelColor,
  labelFontWeight,
  shrink,
  sx,
  ...props
}) {
  const customStyleForSelect = {
    minWidth,
    padding,
    cursor: disabled ? "not-allowed" : "default",
    "& .MuiOutlinedInput-root": {
      cursor: disabled ? "not-allowed" : "text",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? "red" : "rgba(0, 0, 0, 0.23)",
      border: error
        ? "1px solid red"
        : border || `1px solid ${borderColor || rgba(0, 0, 0, 0.23)}`,
    },
    "& .MuiSelect-select": {
      fontSize: selectFontSize,
      cursor: disabled ? "not-allowed" : "default",
      color: color || labelColor,
    },
    ...sx,
  };

  const menuItems = React.useMemo(() => {
    if (multiple) {
      return options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          selected={value.includes(option.value)}
          sx={{
            fontSize: menuItemFontSize,
            padding: "6px 8px",
            mb: "4px",
            borderRadius: "6px",
            bgcolor: "transparent",
            "&.Mui-selected": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
            "&:hover": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
            "&.Mui-selected:hover": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
          }}
          className={`mySelect__option ${optionItemClassName}`}
        >
          {menuDesignType === "checkbox" ? (
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={value?.includes(option.value)}
                sx={{
                  color: "#00A76F !important",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              />
              {option.label}
            </Box>
          ) : menuDesignType === "withAvatar" ? (
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src={option?.avatar || "/dummyUser.svg"}
                referrerPolicy="no-referrer"
                alt={option.label}
                style={{ width: 24, height: 24, borderRadius: "50%" }}
              />
              <Typography fontSize={menuItemFontSize}>
                {option.label}
              </Typography>
            </Box>
          ) : (
            option.label
          )}
        </MenuItem>
      ));
    } else {
      return options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          selected={value === option.value}
          sx={{
            fontSize: menuItemFontSize,
            mb: "4px",
            padding: "6px 8px",
            bgcolor: value === option.value ? "#e0f7fa" : "transparent",
            "&.Mui-selected": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
            "&:hover": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
            "&.Mui-selected:hover": {
              bgcolor: "rgba(145 158 171 / 0.08)",
            },
          }}
          className={`mySelect__option ${optionItemClassName}`}
        >
          {option.label}
        </MenuItem>
      ));
    }
  }, [options, menuItemFontSize, optionItemClassName, value, menuDesignType]);

  const renderMenuItems = () => {
    return menuItems;
  };

  const getRenderValue = ({ multiple, menuDesignType, options }) => {
    if (!multiple) return undefined;

    if (menuDesignType === "withAvatar") {
      return (selected) => (
        <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
          {options
            .filter((opt) => selected.includes(opt.value))
            .map((opt) => (
              <Box
                key={opt.value}
                display="flex"
                alignItems="center"
                gap={0.5}
                px={1}
                py={0.5}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={opt?.avatar || "/dummyUser.svg"}
                  alt={opt.label}
                  referrerPolicy="no-referrer"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  fontSize="13px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {opt.label}
                </Typography>
              </Box>
            ))}
        </Box>
      );
    }

    return (selected) =>
      options
        .filter((opt) => selected.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ");
  };

  return (
    <Box sx={{ minWidth }}>
      <FormControl
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        variant={variant}
        size={size}
        sx={{
          borderRadius,
          boxShadow,
          "& .MuiOutlinedInput-root": {
            borderRadius,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: hoverBorderColor || borderColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
              borderColor: focusedBorder ? undefined : borderColor,
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: labelFontSize,
            transform: shrink ? "translate(14px, -9px) scale(0.75)" : undefined,
            backgroundColor: "white",
            px: "4px",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
            backgroundColor: "white",
            px: "4px",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "red" : activeLabelColor || labelColor,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: error ? "red" : borderColor,
            },
        }}
      >
        <InputLabel id="custom-select-label" shrink={shrink}>
          {required ? (
            <Box display={"flex"} gap={"2px"}>
              <Typography
                fontSize={labelFontSize}
                color={labelColor}
                fontWeight={labelFontWeight}
              >
                {label}
              </Typography>{" "}
              <Typography mt={"-4px"} color={requiredColor || labelColor}>
                *
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography fontSize={labelFontSize} color={labelColor}>
                {label}
              </Typography>
            </Box>
          )}
        </InputLabel>
        <Select
          multiple={multiple}
          labelId="custom-select-label"
          id="custom-select"
          className={`mySelect ${className}`}
          value={multiple ? value || [] : value}
          renderValue={getRenderValue({ multiple, menuDesignType, options })}
          onChange={onChange}
          label={label}
          sx={customStyleForSelect}
          endAdornment={
            loading ? (
              <InputAdornment position="end">
                <CircularProgress size={16} sx={{ mr: 4 }} />
              </InputAdornment>
            ) : null
          }
          MenuProps={{
            PaperProps: {
              className: `mySelect__listBox ${listBoxClasssName}`,
              sx: {
                borderRadius,
                bgcolor: menuBackgroundColor || "white",
                paddingInline: "4px",
                "& .MuiMenuItem-root:hover": {
                  bgcolor: menuHoverColor || "",
                },
              },
            },
          }}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={16} sx={{ marginRight: "8px" }} />{" "}
              Loading...
            </MenuItem>
          ) : (
            renderMenuItems()
          )}
        </Select>
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

MySelect.defaultProps = {
  label: "Select",
  options: [],
  size: "medium",
  variant: "outlined",
  borderRadius: "8px",
  minWidth: 300,
  padding: "8px",
  labelFontSize: "16px",
  selectFontSize: "14px",
  menuItemFontSize: "14px",
  boxShadow: "none",
  helperText: "Please select valid input.",
  borderColor: "black",
  labelColor: "black",
  required: false,
};
