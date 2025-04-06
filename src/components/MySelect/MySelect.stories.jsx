import React, { useState } from "react";
import MySelect from "./MySelect";
import dummyOptions from "./dummyOptions";

export default {
  title: "Components/MySelect",
  component: MySelect,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable select component with various styles and states.",
      },
    },
  },
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Set label for select.",
      defaultValue: "Select",
    },
    value: {
      control: { type: "text" },
      table:{disable:true},
      description: "Set value for select.",
      defaultValue: "",
    },
    onChange: {
      action: "changed",
      description: "Handler to capture selected value changes.",
    },
    options: {
      control: { type: "object" },
      description: "Options array for the dropdown menu.",
      defaultValue: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Set whether the select should take full width.",
      defaultValue: false,
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the select dropdown.",
      defaultValue: false,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Set size of the select input.",
      defaultValue: "medium",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
      description: "Set the variant style of the select.",
      defaultValue: "outlined",
    },
    borderRadius: {
      control: { type: "text" },
      description: "Set border-radius for the select input.",
      defaultValue: "10px",
    },
    minWidth: {
      control: { type: "text" },
      description: "Set minimum width for the select component.",
      defaultValue: "300px",
    },
    padding: {
      control: { type: "text" },
      description: "Set padding inside the select.",
      defaultValue: "0px",
    },
    labelFontSize: {
      control: { type: "text" },
      description: "Set font size for the label.",
      defaultValue: "16px",
    },
    borderColor: {
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
      description: "Set border color for the select.",
      defaultValue: "black",
    },
    hoverBorderColor: {
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
      description: "Set border color for the select when hovered.",
      defaultValue: "",
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
      description: "Set label color for the select.",
      defaultValue: "black",
    },
    selectFontSize: {
      control: { type: "text" },
      description: "Set font size for the selected value.",
      defaultValue: "14px",
    },
    menuItemFontSize: {
      control: { type: "text" },
      description: "Set font size for the dropdown menu items.",
      defaultValue: "14px",
    },
    menuBackgroundColor: {
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
      description: "Set menu background color for the select input.",
      defaultValue: "",
    },
    menuHoverColor: {
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
      description: "Set menu hover color for the select input.",
      defaultValue: "",
    },
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
      description: "Set color for the select input.",
      defaultValue: "",
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
      description: "Set box shadow for the select component.",
      defaultValue: "none",
    },
    placeholder: {
      control: { type: "text" },
      description: "Set placeholder text for the select input.",
      defaultValue: "Select",
    },
    loading: {
      control: { type: "boolean" },
      description: "Show loading state for the dropdown.",
      defaultValue: false,
    },
    helperText: {
      control: { type: "text" },
      description: "Set helper text displayed below the select input.",
      defaultValue: "Please select valid input.",
    },
    error: {
      control: { type: "boolean" },
      description: "Set error state for the select input.",
      defaultValue: false,
    },
    className: {
      control: { type: "text" },
      table:{disable:true},
      description: "Set class name for the select.",
      defaultValue: "",
    },
    listBoxClasssName: {
      control: { type: "text" },
      description: "Set class name for the listbox of select.",
      defaultValue: "",
    },
    optionItemClassName: {
      control: { type: "text" },
      description: "Set class name for the select option item.",
      defaultValue: "",
    },
    required: {
      control: { type: "boolean" },
      description: "Set state for the required select.",
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
      description: "Select the color for required mark.",
      defaultValue: '',
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    args.onChange(selectedValue);
    args.value = selectedValue;
    setValue(selectedValue);
  };

  return <MySelect {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Select Option",
  options: dummyOptions,
  fullWidth: false,
  disabled: false,
  size: "medium",
  variant: "outlined",
  borderRadius: "10px",
  minWidth: "300px",
  padding: "0px",
  labelFontSize: "16px",
  selectFontSize: "14px",
  menuItemFontSize: "14px",
  boxShadow: "none",
  placeholder: "Select an option",
  loading: false,
  helperText: "Please select an option.",
  error: false,
  borderColor: "black",
  labelColor: "black",
  required:false,
};

// export const Error = Template.bind({});
// Error.args = {
//   ...Default.args,
//   error: true,
//   helperText: "Please select a valid option.",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   ...Default.args,
//   disabled: true,
// };

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Default.args,
//   loading: true,
// };

// export const NoOptions = Template.bind({});
// NoOptions.args = {
//   ...Default.args,
//   options: [],
//   placeholder: "No options available",
// };
