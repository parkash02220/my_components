import React, { useState } from "react";
import MyTextfield from "./MyTextfield";
import { useArgs } from "storybook/internal/preview-api";

export default {
  title: "Components/MyTextField",
  component: MyTextfield,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable textfield component with various styles and states.",
      },
    },
  },
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Set the label for the text field.",
      defaultValue: "Enter",
    },
    value: {
      control: { type: "text" },
      description: "Set the value of the text field.",
      defaultValue: "",
    },
    onChange: {
      action: "changed",
      description: "Handler to capture input value changes.",
    },
    placeholder: {
      control: { type: "text" },
      description: "Set placeholder text for the text field.",
      defaultValue: "Enter here...",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
      description: "Set the variant style of the text field.",
      defaultValue: "outlined",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Set the size of the text field.",
      defaultValue: "medium",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Set whether the text field should take full width.",
      defaultValue: false,
    },
    width: {
      control: { type: "text" },
      description: "Set width for the textfield.",
      defaultValue: "",
    },
    minWidth: {
      control: { type: "text" },
      description: "Set min width for the textfield.",
      defaultValue: "300px",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the text field.",
      defaultValue: false,
    },
    error: {
      control: { type: "boolean" },
      description: "Set error state for the text field.",
      defaultValue: false,
    },
    helperText: {
      control: { type: "text" },
      description: "Set helper text displayed below the text field.",
      defaultValue: "Invalid input",
    },
    multiline: {
      control: { type: "boolean" },
      description: "Enable multiline input.",
      defaultValue: false,
    },
    rows: {
      control: { type: "number" },
      description: "Set the number of rows for multiline input.",
      defaultValue: 4,
    },
    borderRadius: {
      control: { type: "text" },
      description: "Set border-radius for the text field.",
      defaultValue: "10px",
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
      description: "Set box shadow for the text field.",
      defaultValue: "none",
    },
    loading: {
      control: { type: "boolean" },
      description: "Show loading spinner in the text field.",
      defaultValue: false,
    },
    InputProps: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom props for the input component.",
      defaultValue: {},
    },
    InputLabelProps: {
      control: { type: "object" },
      table: { disable: true },
      description: "Custom props for the input label.",
    },
    labelFontSize: {
      control: { type: "text" },
      description: "Set font size for the label.",
      defaultValue: "14px",
    },
    inputFontSize: {
      control: { type: "text" },
      description: "Set font size for the input value.",
      defaultValue: "14px",
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
      description: "Set label color.",
      defaultValue: "black",
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
      description: "Set border color.",
      defaultValue: "black",
    },
    errorBorderColor: {
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
      description: "Set error border color.",
      defaultValue: "red",
    },
    customLabelSx: {
      control: { type: "object" },
      table: { disable: true },
      description: "Mui sx style for label.",
      defaultValue: "",
    },
    sx: {
      control: { type: "object" },
      table: { disable: true },
      description: "Mui sx style for textfield.",
      defaultValue: "",
    },
    required: {
      control: { type: "boolean" },
      description: "Mark field required or not.",
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
      description: "Set required mark color.",
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
      description: "Set input border color when hovered.",
      defaultValue: "black",
    },
    shrink: {
      control: { type: "boolean" },
      description: "Set state for label shrink.",
      defaultValue: "",
    },
    helperTextFontSize: {
      control: { type: "text" },
      description: "Set font size for helper text.",
      defaultValue: "12px",
    },
    autoComplete: {
      control: { type: "radio" },
      description: "Choose the autocomplete mode.",
      options:["on","off"],
      defaultValue: "on",
    },
    type: {
      control: { type: "select" },
      options: [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "datetime-local",
        "time",
        "month",
        "week",
        "file",
        "color",
      ],
      description: "Specifies the type of input element.",
      defaultValue: "text",
    },
  },
};

const Template = (args) => {
  const [{value},updateArgs] = useArgs();

  const handleChange = (event) => {
    const newValue = event.target.value;
    updateArgs({value:newValue});
    if(args.onChange){
      args.onChange(event);
    }
  };

  return <MyTextfield {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Enter Text",
  placeholder: "Type something...",
  fullWidth: false,
  disabled: false,
  size: "medium",
  variant: "outlined",
  helperText: "",
  error: false,
  multiline: false,
  loading: false,
  rows: 4,
  borderRadius: "8px",
  labelFontSize: "14px",
  inputFontSize: "14px",
  borderColor: "black",
  labelColor: "black",
  boxShadow: "none",
  required: false,
  minWidth: "300px",
  type: "text",
  helperTextFontSize: "12px",
  autoComplete:"on",
};

// export const Error = Template.bind({});
// Error.args = {
//   ...Default.args,
//   error: true,
//   helperText: "This field is required.",
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

// export const Multiline = Template.bind({});
// Multiline.args = {
//   ...Default.args,
//   multiline: true,
//   rows: 4,
//   placeholder: "Enter multiline text...",
// };

// export const RequiredField = Template.bind({});
// RequiredField.args = {
//   ...Default.args,
//   required: true,
// };
