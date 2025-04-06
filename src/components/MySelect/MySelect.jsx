import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CircularProgress, FormHelperText, InputAdornment, Typography } from "@mui/material";
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
  borderColor = "black",
  labelColor = "black",
  className,
  listBoxClasssName,
  optionItemClassName,
  hoverBorderColor,
  color,
  required,
  requiredColor,
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
      border: error ? "1px solid red" : `1px solid ${borderColor || rgba(0, 0, 0, 0.23)}`,
    },
    "& .MuiSelect-select": {
      fontSize: selectFontSize,
      cursor: disabled ? "not-allowed" : "default",
      color: color || labelColor,
    },
    ...sx,
  };

  const menuItems = React.useMemo(() => {
    return options.map((option) => (
      <MenuItem
        key={option.value}
        value={option.value}
        sx={{ fontSize: menuItemFontSize }}
        className={`mySelect__option ${optionItemClassName}`}
      >
        {option.label}
      </MenuItem>
    ));
  }, [options, menuItemFontSize, optionItemClassName]);

  const renderMenuItems = () => {
    return menuItems;
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
            borderColor: error ? "red" : borderColor,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${error ? "red" : hoverBorderColor || borderColor}`,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${error ? "red" : borderColor}`,
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: labelFontSize,
            color: error ? "red" : disabled ? "#a9a9a9" : labelColor,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "red" : labelColor,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: error ? "red" : borderColor,
            },
        }}
      >
        <InputLabel
          id="custom-select-label"
        >
         {required ? 
         ( <Box display={'flex'} gap={'2px'}>
           <Typography fontSize={labelFontSize} color={labelColor}>{label}</Typography> <Typography mt={'-4px'} color={requiredColor || labelColor}>*</Typography>
          </Box> )
           :   
           ( <Box>
           <Typography fontSize={labelFontSize}  color={labelColor}>{label}</Typography>
          </Box> )
         }
        </InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          className={`mySelect ${className}`}
          value={value}
          onChange={onChange}
          label={label}
          sx={customStyleForSelect}
          endAdornment={
            loading ? (
              <InputAdornment position="end">
                <CircularProgress size={16} sx={{mr:4}}/>
              </InputAdornment>
            ) : null
          }
          MenuProps={{
            PaperProps: {
              className: `mySelect__listBox ${listBoxClasssName}`,
              sx: {
                borderRadius,
                bgcolor: menuBackgroundColor || "white",
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
  required:false,
};
