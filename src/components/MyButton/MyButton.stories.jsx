import React from "react";
import MyButton from "./MyButton";
import {
  Save,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

export default {
  title: "Components/MyButton",
  component: MyButton,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable button component with various styles and states.",
      },
    },
  },
  argTypes: {
    color: {
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
      description: "The color of the button.",
      defaultValue: "white",
    },
    variant: {
      control: { type: "select" },
      options: ["unset", "text", "outlined", "contained"],
      description: "The variant of the button.",
      defaultValue: "contained",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "The size of the button.",
      defaultValue: "medium",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the button spans the full width of its container.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the button if true.",
    },
    startIcon: {
      control: { type: "select" },
      options: ["none","save", "delete", "down", "up"],
      description: "The icon displayed at the start of the button.",
    },
    endIcon: {
      control: { type: "select" },
      options: ["none","save", "delete", "down", "up"],
      description: "The icon displayed at the end of the button.",
    },
    iconOnly: {
      control: { type: "boolean" },
      description: "Set the state if button should only display icon.",
    },
    onClick: {
      action: "clicked",
      description: "Function to handle click events.",
    },
    children: {
      control: { type: "text" },
      description: "The content of the button.",
      defaultValue: "My Button",
    },
    loading: {
      control: { type: "boolean" },
      description: "Set loading state for button.",
      defaultValue: false,
    },
    loadingText: {
      control: { type: "text" },
      description: "Set loading message for button.",
      defaultValue: "Loading...",
    },
    fontSize: {
      control: { type: "text" },
      description: "Set font size of the button.",
      defaultValue: "",
    },
    width: {
      control: { type: "text" },
      description: "Set width of the button.",
      defaultValue: "",
    },
    minWidth: {
      control: { type: "text" },
      description: "Set minWidth of the button.",
      defaultValue: "150px",
    },
    borderRadius: {
      control: { type: "text" },
      description: "Set border radius of the button.",
      defaultValue: "10px",
    },
    textTransform: {
      control: { type: "select" },
      options: ["none", "capitalize", "uppercase", "lowercase", "inherit"],
      description: "Set text casing of the button.",
      defaultValue: "none",
    },
    padding: {
      control: { type: "text" },
      description: "Set padding for button.",
      defaultValue: "",
    },
    margin: {
      control: { type: "text" },
      description: "Set margin for button.",
      defaultValue: "0",
    },
    boxShadow: {
      control: { type: "select" },
      options: [
        "none",
        "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", // Subtle
        "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // Medium
        "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)", // Prominent
        "0 12px 24px rgba(0, 0, 0, 0.2)", // Soft and Diffused
        "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)", // Floating
        "inset 0 2px 4px rgba(0, 0, 0, 0.1)", // Inner shadow
      ],
      description: "Set box shadow for button.",
      defaultValue: "none",
    },
    loadingIndicator: {
      control: { type: "radio" },
      options: [
        null,
        "/loading1.svg", // Option 1
        "/loading2.svg", // Option 2
      ],
      description: "Set loading indicator for button.",
      defaultValue: null,
    },
    hoverBgColor: {
      control: { type: "select" },
      options: [
        "#1C252ECC",
        "white",
        "black",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "none",
        "inherit",
        "unset",
      ],
      description: "Choose background color when hover.",
      defaultValue: "rgba(28,37,46,0.8)",
    },
    activeBgColor: {
      control: { type: "select" },
      options: [
        "#1C252ECC",
        "white",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "none",
        "inherit",
        "unset",
      ],
      description: "Choose background color when active.",
      defaultValue: "",
    },
    backgroundColor: {
      control: { type: "select" },
      options: [
        "#1C252E",
        "black",
        "white",
        "blue",
        "purple",
        "green",
        "red",
        "lightBlue",
        "orange",
        "none",
        "inherit",
        "unset",
      ],
      description: "Choose background color of button.",
      defaultValue: "",
    },
    fontWeight: {
      control: { type: "number" },
      description: "Give font weight to button.",
      defaultValue: 700,
    },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
      description: "Set button type.",
      defaultValue: "button",
    },
  },
};

const iconMap = {
  none:undefined,
  save: <Save />,
  delete: <Delete />,
  down: <KeyboardArrowDown />,
  up: <KeyboardArrowUp />,
};

const Template = (args) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted!");
        alert("Form submitted!");
      }}
      onReset={() => {
        console.log("Form reset!");
        alert("Form reset!");
      }}
    >
      <MyButton
        {...args}
        startIcon={iconMap[args.startIcon]}
        endIcon={iconMap[args.endIcon]}
      />
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  color: "black",
  variant: "contained",
  size: "medium",
  fullWidth: false,
  disabled: false,
  children: "My Button",
  loading: false,
  loadingText: "Loading...",
  borderRadius: "10px",
  textTransform: "none",
  margin: "0",
  boxShadow: "none",
  loadingIndicator: null,
  className: "",
  fontWeight: 700,
  hoverBgColor: "rgba(28,37,46,0.8)",
  type: "button",
  minWidth: "150px",
};

// export const WithStartIcon = Template.bind({});
// WithStartIcon.args = {
//   ...Default.args,
//   color: "green",
//   variant: "contained",
//   size: "large",
//   startIcon: <Save />,
//   children: "Save",
// };

// export const WithEndIcon = Template.bind({});
// WithEndIcon.args = {
//   ...Default.args,
//   color: "white",
//   variant: "outlined",
//   size: "medium",
//   endIcon: <Delete />,
//   children: "Delete",
// };

// export const FullWidth = Template.bind({});
// FullWidth.args = {
//   ...Default.args,
//   color: "blue",
//   variant: "contained",
//   size: "medium",
//   fullWidth: true,
//   children: "Full Width Button",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   ...Default.args,
//   color: "purple",
//   variant: "contained",
//   size: "large",
//   disabled: true,
//   children: "Disabled Button",
// };

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Default.args,
//   color: "blue",
//   variant: "contained",
//   size: "large",
//   loading: true,
//   loadingText: "Loading...",
//   children: "Loading Button",
// };
