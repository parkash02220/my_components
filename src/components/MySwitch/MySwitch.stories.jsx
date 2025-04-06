import React, { useState } from "react";
import MySwitch from "./MySwitch";
import { useArgs } from "storybook/internal/preview-api";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
export default {
  title: "Components/MySwitch",
  component: MySwitch,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable switch component with various styles and states.",
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Set the initial checked state of the switch.",
      defaultValue: false,
    },
    onChange: {
      action: "changed",
      description: "Handler to capture state changes.",
    },
    label: {
      control: { type: "text" },
      description: "Set the label for the switch.",
      defaultValue: "Switch",
    },
    labelPlacement: {
      control: { type: "select" },
      options: ["end", "start", "top", "bottom"],
      description: "Set the position of the label relative to the switch.",
      defaultValue: "end",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the switch.",
      defaultValue: false,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Set the size of the switch.",
      defaultValue: "medium",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text displayed below the switch.",
      defaultValue: "",
    },
    error: {
      control: { type: "boolean" },
      description: "Set the error state for the switch.",
      defaultValue: false,
    },
    trackBgColor: {
      control: { type: "select" },
      options: [
        "white",
        "black",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "gray",
        "none",
        "inherit",
        "unset",
      ],
      description: "Set the background color of the switch track.",
      defaultValue: "#E9E9EA",
    },
    checkedTrackBgColor: {
      control: { type: "select" },
      options: [
        "white",
        "black",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "gray",
        "none",
        "inherit",
        "unset",
      ],
      description:
        "Set the background color of the track when the switch is checked.",
      defaultValue: "rgba(0, 100, 0, 0.6)",
    },
    switchStyle: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom styles for the switch component.",
      defaultValue: {},
    },
    labelStyle: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom styles for the label.",
      defaultValue: {},
    },
    boxStyle: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom styles for the surrounding box.",
      defaultValue: {},
    },
    formGroupStyle: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom styles for the FormGroup component.",
      defaultValue: {},
    },
    fontSize: {
      control: { type: "text" },
      description: "Set the font size of the label.",
      defaultValue: "16px",
    },
    fontWeight: {
      control: { type: "number" },
      description: "Set the font weight of the label.",
      defaultValue: 400,
    },
    labelColor: {
      control: { type: "select" },
      options: [
        "white",
        "black",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "gray",
        "none",
        "inherit",
        "unset",
      ],
      description: "Set the color of the label.",
      defaultValue: "black",
    },
    required: {
      control: { type: "boolean" },
      description: "Mark the label as required.",
      defaultValue: false,
    },
    requiredColor: {
      control: { type: "select" },
      options: [
        "white",
        "black",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "gray",
        "none",
        "inherit",
        "unset",
      ],
      description: "Set the color of the required asterisk.",
      defaultValue: "red",
    },
    className: {
      control: { type: "text" },
      description: "Set a custom class name for the wrapper.",
      defaultValue: "",
    },
    loading: {
      control: { type: "boolean" },
      description: "Set loading state for loader.",
      defaultValue: false,
    },
    startIcon: {
      control: { type: "select" },
      options: ["none", "notification", "call", "email"],
      description: "The icon displayed at the start of the button.",
    },
    endIcon: {
      control: { type: "select" },
      options: ["none", "notification", "call", "email"],
      description: "The icon displayed at the end of the button.",
    },
    loadingIndicator: {
      control: { type: "radio" },
      options: [
        null,
        "/loadingB1.svg", // Option 1
        "/loadingB2.svg", // Option 2
      ],
      description: "Set loading indicator for switch.",
      defaultValue: null,
    },
  },
};

const iconMap = {
  none: null,
  notification: <NotificationsIcon />,
  call: <CallIcon />,
  email: <EmailIcon />,
};

const Template = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    updateArgs({ checked: newChecked });
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return (
    <MySwitch
      {...args}
      startIcon={iconMap[args.startIcon]}
      endIcon={iconMap[args.endIcon]}
      checked={checked}
      onChange={handleChange}
    />
  );
};
export const Default = Template.bind({});
Default.args = {
  label: "Custom Switch",
  labelPlacement: "end",
  disabled: false,
  size: "medium",
  trackBgColor: "#E9E9EA",
  checkedTrackBgColor: "rgba(0, 100, 0, 0.6)",
  helperText: "",
  error: false,
  switchStyle: {},
  labelStyle: {},
  boxStyle: {},
  formGroupStyle: {},
  fontSize: "16px",
  fontWeight: 500,
  labelColor: "black",
  required: false,
  requiredColor: "red",
  loading: false,
  loadingIndicator:null,
};

// export const Error = Template.bind({});
// Error.args = {
//   ...Default.args,
//   error: true,
//   helperText: "An error occurred.",
//   color: "error",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   ...Default.args,
//   disabled: true,
// };

// export const CustomStyles = Template.bind({});
// CustomStyles.args = {
//   ...Default.args,
//   label: "Styled Switch",
//   switchStyle: { backgroundColor: "lightblue" },
//   labelStyle: { fontWeight: "bold", fontSize: "16px" },
//   boxStyle: {
//     padding: "20px",
//     backgroundColor: "#f5f5f5",
//     width: "fit-content",
//   },
//   formGroupStyle: { gap: "10px" },
//   labelColor: "blue",
// };

// export const Required = Template.bind({});
// Required.args = {
//   ...Default.args,
//   label: "Required Switch",
//   required: true,
//   requiredColor: "red",
// };
