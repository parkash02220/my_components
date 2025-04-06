import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import "./MySwitch.style.css";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ trackbgcolor, checkedtrackbgcolor, size, disabled }) => ({
  width: size === "medium" ? 50 : 40,
  height: size === "medium" ? 26 : 22,
  cursor: disabled ? "not-allowed" : "pointer",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: size === "medium" ? "translateX(23px)" : "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: checkedtrackbgcolor,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "1px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#E9E9EA",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: size === "medium" ? 22 : 16,
    height: size === "medium" ? 22 : 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: trackbgcolor,
    opacity: 1,
    transition: "background-color 500ms",
  },
}));

export default function MySwitch({
  checked,
  onChange,
  label = "Switch",
  labelPlacement = "end",
  disabled = false,
  size = "medium",
  helperText = "",
  error = false,
  switchStyle = {},
  labelStyle = {},
  boxStyle = {},
  formGroupStyle = {},
  className = "",
  trackBgColor = "#E9E9EA",
  checkedTrackBgColor = "rgb(0, 100, 0,0.6)",
  fontSize = "16px",
  fontWeight = 400,
  labelColor = "black",
  required = false,
  requiredColor = "red",
  loading = false,
  startIcon,
  endIcon,
  loadingIndicator,
  ...props
}) {
  console.log("::loading indicator",loadingIndicator)
  return (
    <Box sx={{ width: "fit-content", ...boxStyle }} className={className}>
      <FormGroup sx={{ ...formGroupStyle }} >
        <FormControlLabel
          control={
            (  <IOSSwitch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                size={size}
                checkedtrackbgcolor={checkedTrackBgColor}
                trackbgcolor={trackBgColor}
                sx={{ ...switchStyle }}
                {...props}
              />
            )
          }
          label={
            <>
            <Box display={'flex'}>
            {loading ? loadingIndicator ? (
               <img
               src={loadingIndicator}
               alt="loading indicator"
               width={20}
               height={20}
               className="spin"
               style={{marginRight:"8px"}}
             />
            ) : (
                 <CircularProgress size={20} color="inherit" sx={{ mr: "8px" }} />
               ) : null}
              {startIcon && !loading && (
                <span style={{ marginRight: "8px" }}>{startIcon}</span>
              )}
              {label}
              {endIcon && <span style={{ marginLeft: "8px" }}>{endIcon}</span>}
              {required && (
                <span
                  style={{
                    color: requiredColor,
                    fontSize: "16px",
                    position: "relative",
                    top: "-4px",
                  }}
                >
                  {" "}
                  *
                </span>
              )}
            </Box>
            </>
          }
          labelPlacement={labelPlacement}
          sx={{
            gap: "16px",
            "& .MuiFormControlLabel-label": {
              fontSize,
              fontWeight,
              ...labelStyle,
              color: error
                ? "red"
                : disabled
                ? "#a9a9a9"
                : labelColor || "inherit",
            },
          }}
        />
        {error && helperText && (
          <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
        )}
      </FormGroup>
    </Box>
  );
}

MySwitch.defaultProps = {
  label: "Switch",
  labelPlacement: "end",
  size: "medium",
  disabled: false,
  helperText: "",
  error: false,
  switchStyle: {},
  labelStyle: {},
  boxStyle: {},
  formGroupStyle: {},
  trackBgColor: "#E9E9EA",
  checkedTrackBgColor: "rgb(0, 100, 0,0.6)",
  fontSize: "16px",
  fontWeight: 500,
  labelColor: "black",
  required: false,
  requiredColor: "red",
  loading: false,
  loadingIndicator:null,
};
