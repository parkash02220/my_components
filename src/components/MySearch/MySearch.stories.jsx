import React, { useState } from "react";
import MySearch from "./MySearch";
import { useArgs } from "storybook/internal/preview-api";

export default {
  title: "Components/MySearch",
  component: MySearch,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable search input with clear functionality and dynamic styles.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Current value of the search input.",
      defaultValue: "",
    },
    onChange: {
      action: "changed",
      table:{disable:true},
      description: "Callback when the search value changes.",
    },
    onClear: {
      action: "cleared",
      table:{disable:true},
      description: "Callback when the clear button is clicked.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input.",
      defaultValue: "Search…",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the search input.",
      defaultValue: "",
    },
    loading: {
      control: "boolean",
      description: "Set state for loading.",
      defaultValue: false,
    },
    error: {
      control: "boolean",
      description: "Indicates if the input is in an error state.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Indicates if the input is disabled.",
      defaultValue: false,
    },
    searchIconColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Color of the search icon.",
      defaultValue: "#666",
    },
    clearIconColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Color of the clear icon.",
      defaultValue: "#666",
    },
    borderColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Border color of the search input.",
      defaultValue: "#ccc",
    },
    focusedBorderColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Border color when the input is focused.",
      defaultValue: "#1976d2",
    },
    inputTextColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Border color when the input is focused.",
      defaultValue: "",
    },
    helperTextColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Border color when the input is focused.",
      defaultValue: "",
    },
    errorTextColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Border color when the input is focused.",
      defaultValue: "",
    },
    backgroundColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Background color of the input box.",
      defaultValue: "#fff",
    },
    errorBorderColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Background color of the input box.",
      defaultValue: "#fff",
    },
    hoverBorderColor: {
      control: { type: "select" },
      options: [
        "#666",
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
      description: "Background color of the input box.",
      defaultValue: "#fff",
    },
    borderRadius: {
      control: "text",
      description: "Border radius of the search input box.",
      defaultValue: "4px",
    },
    inputFontSize: {
      control: "text",
      description: "Font size for the search input.",
      defaultValue: "16px",
    },
    showClearButton: {
      control: "boolean",
      description: "Whether to show the clear button.",
      defaultValue: true,
    },
    width: {
      control: "text",
      description: "Set the width of the search box.",
      defaultValue: "",
    },
    minWidth: {
      control: "text",
      description: "Set the minimum width of the search box.",
      defaultValue: "300px",
    },
    fullWidth: {
      control: "boolean",
      description: "Set if the search box should take full width.",
      defaultValue: false,
    },
    onSearch: {
      action: "searched",
       table:{disable:true},
      description: "Callback when the search icon is clicked.",
    },
  },
};

const Template = (args) => {
  const [{value},updateArgs] = useArgs();

  const handleChange = (event) => {
    const newValue = event.target.value;
    updateArgs({ value: newValue });
    args.onChange(newValue);
  };


  const handleClear = () => {
   updateArgs({value:""});
   if (args.onClear) {
    args.onClear();
  }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (args.onSearch) {
        args.onSearch(value);
      }
    }
  };

  return (
    <MySearch
      {...args}
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      onKeyDown={handleKeyDown}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search…",
  helperText: "",
  error: false,
  disabled: false,
  searchIconColor: "black",
  clearIconColor: "black",
  borderColor: "black",
  focusedBorderColor: "black",
  backgroundColor: "#fff",
  borderRadius: "10px",
  inputFontSize: "16px",
  showClearButton: true,
};

// export const Error = Template.bind({});
// Error.args = {
//   ...Default.args,
//   error: true,
//   helperText: "An error occurred.",
//   borderColor: "red",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   ...Default.args,
//   disabled: true,
//   placeholder: "Search is disabled.",
// };

// export const WithHelperText = Template.bind({});
// WithHelperText.args = {
//   ...Default.args,
//   helperText: "Search for items using keywords.",
// };

// export const CustomStyles = Template.bind({});
// CustomStyles.args = {
//   ...Default.args,
//   borderColor: "blue",
//   backgroundColor: "#f5f5f5",
//   inputFontSize: "18px",
//   borderRadius: "8px",
// };

// export const DynamicWidth = Template.bind({});
// DynamicWidth.args = {
//   ...Default.args,
//   width: "50%",
//   fullWidth: true,
//   minWidth: "400px",
// };
