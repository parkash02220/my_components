import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

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
  renderOption,
  renderValue,
  loadMoreRef,
  hasMore,
  loadingMore,
  onClose,
  menuMaxHeight,
  selectValueMaxHeight,
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
      borderColor: error ? "red" : borderColor,
      border: error ? "1px solid red" : border || `1px solid ${borderColor}`,
    },
    "& .MuiSelect-select": {
      paddingBottom: { xs: "12px", sm: "14px" },
      fontSize: selectFontSize,
      color: disabled ? "#a9a9a9" : color || labelColor,
      maxHeight: selectValueMaxHeight || "80px",
      overflowY: "auto",
    },
    ...sx,
  };

  const renderDefaultOption = (option) => {
    if (multiple && menuDesignType === "checkbox") {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Checkbox
            checked={value.includes(option.value)}
            sx={{ color: "#00A76F !important", padding: "4px" }}
          />
          {option.label}
        </Box>
      );
    }

    if (multiple && menuDesignType === "withAvatar") {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src={option.avatar || "/dummyUser.svg"}
            alt={option.label}
            referrerPolicy="no-referrer"
            style={{ width: 24, height: 24, borderRadius: "50%" }}
          />
          <Typography fontSize={menuItemFontSize}>{option.label}</Typography>
        </Box>
      );
    }

    return option.label;
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
          "& .MuiOutlinedInput-root.Mui-disabled": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: hoverBorderColor || borderColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focusedBorder ? undefined : borderColor,
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: labelFontSize,
            color: labelColor,
            fontWeight: labelFontWeight,
            backgroundColor: "white",
            px: "4px",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "red" : activeLabelColor || labelColor,
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
            backgroundColor: "white",
            px: "4px",
          },
        }}
      >
        <InputLabel id="custom-select-label" shrink={shrink}>
          {required ? (
            <Box display="flex" gap={"2px"}>
              <Typography fontSize={labelFontSize}>{label}</Typography>
              <Typography color={requiredColor || labelColor}>*</Typography>
            </Box>
          ) : (
            label
          )}
        </InputLabel>

        <Select
          labelId="custom-select-label"
          id="custom-select"
          multiple={multiple}
          className={`mySelect ${className}`}
          value={multiple ? value || [] : value}
          renderValue={(selected) => {
            if (renderValue) {
              return renderValue(selected, { options });
            }
            if (!multiple)
              return options.find((opt) => opt.value === selected)?.label || "";

            return options
              .filter((opt) => selected.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ");
          }}
          onChange={onChange}
          onClose={onClose}
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
                px: "4px",
                maxHeight: menuMaxHeight || "300px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: 0,
                  height: 0,
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "transparent",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
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
              <CircularProgress size={16} sx={{ marginRight: "8px" }} />
              Loading...
            </MenuItem>
          ) : (
            [
              ...options.map((option) => (
                <MenuItem
                  key={option?.id || option.value}
                  value={option.value}
                  selected={
                    multiple
                      ? value.includes(option.value)
                      : value === option.value
                  }
                  className={`mySelect__option ${optionItemClassName}`}
                  sx={{
                    fontSize: menuItemFontSize,
                    padding: { xs: "0px 8px", sm: "6px 8px" },
                    mb: { xs: "0px", sm: "4px" },
                    borderRadius: "6px",
                    bgcolor: "transparent",
                    "&.Mui-selected": {
                      bgcolor: "rgba(145 158 171 / 0.08)",
                    },
                    "&:hover": {
                      bgcolor: "rgba(145 158 171 / 0.08)",
                    },
                  }}
                >
                  {renderOption
                    ? renderOption(option)
                    : renderDefaultOption(option)}
                </MenuItem>
              )),
              loadingMore && (
                <MenuItem key="loadingMore" disabled>
                  <CircularProgress size={16} sx={{ marginRight: "8px" }} />
                  Loading more...
                </MenuItem>
              ),
              hasMore && !loadingMore && (
                <Box
                  key="loadMoreRef"
                  ref={loadMoreRef}
                  sx={{ height: "1px" }}
                />
              ),
            ]
          )}
        </Select>

        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

MySelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.func,
  renderValue: PropTypes.func,
  loadMoreRef: PropTypes.any,
  hasMore: PropTypes.bool,
  loadingMore: PropTypes.bool,
};

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
  borderColor: "black",
  labelColor: "black",
  required: false,
  multiple: false,
  hasMore: false,
  loadingMore: false,
  menuMaxHeight: "300px",
};
