import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, CircularProgress, List } from "@mui/material";

const CustomListbox = React.forwardRef(function CustomListbox(props, ref) {
  const { children, loadMoreRef, loadingMore, hasMore, ...rest } = props;

  return (
    <List ref={ref} {...rest} className="autoComplete__listBox"  sx={{
      maxHeight: 400,
      overflowY: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }}>
      <Box className="autoComplete__items" sx={{
        padding:'8px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        '& li': {
          padding: '8px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#f4f4f4',
          },
        },
      }}>{children}</Box>
      {loadingMore && (
        <Box display="flex" justifyContent="center" p={1}>
          <img
            src="/iosLoader.gif"
            alt="loader"
            style={{ width: "30px", height: "30px" }}
          />
        </Box>
      )}
      {hasMore && !loadingMore && <Box ref={loadMoreRef} sx={{ height: "1px" }} />}
    </List>
  );
});

const LoadingOptions = () => {
  return <Box sx={{
    height:300,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }}>
<img src="/iosLoader.gif" alt="loader" style={{width:"40px",height:"40px"}} />
  </Box>
}

export default function MyAutoComplete({
  disablePortal,
  fullWidth,
  width,
  borderRadius,
  placeholder,
  labelColor,
  borderColor,
  optionBoxBorderRadius,
  optionBoxPadding,
  fontSize,
  optionBoxFontSize,
  value,
  onChange,
  onInputChange,
  error,
  helperText,
  disabled,
  loading,
  loadingText,
  options,
  noOptionsText,
  renderOption,
  getOptionLabel,
  className,
  listBoxClassName,
  label,
  shrink,
  hoverOptionBgColor,
  minWidth,
  hoverBorderColor,
  sx,
  multiple,
  clearIcon,
  renderTags,
  required,
  requiredColor,
  textFieldSx,
  loadMoreRef,
  hasMore,
  loadingMore,
  labelFontSize,
  ...props
}) {
  const customStyleForAutoComplete = {
    width: fullWidth ? "100%" : width || "auto",
    minWidth,
    "& .MuiOutlinedInput-root": {
      borderRadius,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: error ? "red" : hoverBorderColor || borderColor || 'black',
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: error ? "red" : borderColor,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${borderColor || "black"}`,
    },
    "& .MuiInputBase-input": {
      fontSize,
      color: disabled ? "#a9a9a9" : "inherit",
      cursor: disabled ? "not-allowed" : "text",
    },
    "& .MuiInputLabel-root": {
      color: error ? "red" : disabled ? "#a9a9a9" : labelColor,
      fontSize: labelFontSize || "16px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: error ? "red" : labelColor,
      fontSize: labelFontSize || "16px",
    },
    // "& .MuiAutocomplete-popupIndicator": {
    //   display: "none",
    // },
    "& .MuiInputLabel-root.Mui-focused": {
      color: error ? "red" : labelColor,
      fontSize: labelFontSize || "16px",
    },
    ...sx,
  };

  return (
    <Box  
    width={fullWidth ? "100%" : "fit-content"}
  >
    <Autocomplete
      className={`myAutoComplete ${className || ""}`}
      disablePortal={disablePortal}
      multiple={multiple}
      clearIcon={clearIcon}
      options={loading ? [] : Array.isArray(options) ? options : []}
      noOptionsText={
        noOptionsText ? noOptionsText : loading ? loadingText || <LoadingOptions /> : "no options found."
      }
      disabled={disabled}
      value={multiple ? value || [] : value}
      onChange={(event, newValue) => {
        if (onChange) {
          onChange(event, newValue);
        }
      }}
      onInputChange={(event, inputValue) => {
        if (onInputChange) onInputChange(event, inputValue);
      }}
      popupIcon={
        loading ? (
          <CircularProgress size={20} style={{ marginRight: "16px" }} />
        ) : (
          <img
            src="/dropdown-arrow.svg"
            alt="Dropdown Arrow"
            style={{
              width: 28,
              height: 28,
              opacity: disabled ? "0.3" : "0.5",
            }}
          />
        )
      }
      sx={customStyleForAutoComplete}
      slotProps={{
        paper: {
          className: `myAutoComplete__listBox ${listBoxClassName || ""}`,
          sx: {
            borderRadius: optionBoxBorderRadius,
            "& .MuiAutocomplete-listbox": {
              padding: optionBoxPadding,
              "& .MuiAutocomplete-option": {
                fontSize: optionBoxFontSize,
                "&:hover": {
                  backgroundColor: hoverOptionBgColor || "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            "& .MuiAutocomplete-noOptions": {
              fontSize,
            },
          },
        },
      }}
      getOptionLabel={(option) =>
        getOptionLabel ? getOptionLabel(option) : option.label || option
      }
      renderOption={
        renderOption
          ? renderOption
          : (props, option) => <li {...props}>{option.label || option}</li>
      }
      renderTags={renderTags}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={error && helperText}
          placeholder={placeholder}
          label={label || ""}
          required={required}
          InputLabelProps={{
            shrink,
          }}
          sx={{
            ...textFieldSx,
            "& .MuiInputLabel-asterisk": {
              color: requiredColor,
            },
          }}
        />
      )}
      ListboxComponent={CustomListbox}
      componentsProps={{
        listbox: {
          loadMoreRef,
          loadingMore,
          hasMore,
        },
      }}
      {...props}
    />
     </Box>
  );
}
MyAutoComplete.defaultProps = {
  disablePortal: false,
  borderRadius: "10px",
  placeholder: "",
  borderColor: "black",
  labelColor: "black",
  optionBoxBorderRadius: "8px",
  optionBoxPadding: "8px",
  fontSize: "14px",
  optionBoxFontSize: "14px",
  error: false,
  helperText: "",
  disabled: false,
  loading: false,
  loadingText: "Loading...",
  options: [],
  noOptionsText: "No options available",
  renderOption: null,
  getOptionLabel: null,
  label: "",
  minWidth: "300px",
  fullWidth: false,
  multiple:false,
  required:false,
  hasMore:false,
};
