import React, { useState } from "react";
import MyAutoComplete from "./MyAutoComplete";
import top100Films from "./top100films";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { Chip } from "@mui/material";
export default {
  title: "Components/MyAutoComplete",
  component: MyAutoComplete,
  parameters: {
    docs: {
      description: {
        component:
          "This is a customizable auto complete component with various styles and states.",
      },
    },
  },
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Give class to the Autocomplete.",
      defaultValue: "",
    },
    listBoxClassName: {
      control: { type: "text" },
      description: "Give class to the Autocomplete option box.",
      defaultValue: "",
    },
    disablePortal: {
      control: { type: "boolean" },
      description: "Disable the portal for the Autocomplete dropdown.",
    },
    width: {
      control: { type: "number" },
      description: "Set the width of the Autocomplete component.",
      defaultValue: "",
    },
    minWidth: {
      control: { type: "text" },
      description: "Set the minimum width of the Autocomplete component.",
      defaultValue: "300px",
    },
    borderRadius: {
      control: { type: "text" },
      description: "Set the border radius for the input box.",
      defaultValue: "10px",
    },
    label: {
      control: { type: "text" },
      description: "Give label to the Autocomplete.",
      defaultValue: "",
    },
    placeholder: {
      control: { type: "text" },
      description: "Set the placeholder text for the input box.",
      defaultValue: "",
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
        "none",
        "inherit",
        "unset",
      ],
      description:
        "Set the border color of the input box when hovered or focused.",
      defaultValue: "black",
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
    optionBoxBorderRadius: {
      control: { type: "text" },
      description: "Set the border radius for the option box.",
      defaultValue: "8px",
    },
    optionBoxPadding: {
      control: { type: "text" },
      description: "Set the padding inside the option box.",
      defaultValue: "8px",
    },
    fontSize: {
      control: { type: "text" },
      description: "Set the font size for the input value.",
      defaultValue: "14px",
    },
    optionBoxFontSize: {
      control: { type: "text" },
      description: "Set the font size for the options inside the dropdown.",
      defaultValue: "14px",
    },
    error: {
      control: { type: "boolean" },
      description: "Set the error state of the automcomplete.",
      defaultValue: false,
    },
    helperText: {
      control: { type: "text" },
      description: "Set the text for the error",
      defaultValue: "Please select valid option.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Set the disable state for autocomplete",
      defaultValue: false,
    },
    loading: {
      control: { type: "boolean" },
      description: "Set the loading state for autocomplete",
      defaultValue: false,
    },
    loadingText: {
      control: { type: "text" },
      description: "Set the loading message for autocomplete",
      defaultValue: "",
    },
    options: {
      control: { type: "array" },
      description: "Set the data for autocomplete options",
      defaultValue: [],
    },
    renderOption: {
      control: { type: "select" },
      options: ["default", "withImages", "detailed"],
      description:
        "Custom render logic for dropdown options. Choose a predefined rendering style.",
      defaultValue: "default",
    },
    shrink: {
      control: { type: "boolean" },
      description: "Set the state for the auto complete input shrink",
      defaultValue: "",
    },
    hoverOptionBgColor: {
      control: { type: "select" },
      options: [
        "rgba(0, 0, 0, 0.1)",
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
      description: "Choose the background color for option when hovered",
      defaultValue: "rgba(0, 0, 0, 0.1)",
    },
    hoverBorderColor: {
      control: { type: "select" },
      options: [
        "rgba(0, 0, 0, 0.1)",
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
      description: "Choose the border color for autocomplete when hovered",
      defaultValue: "",
    },
    getOptionLabel: {
      control: { type: "select" },
      options: ["Default", "WithYear"],
      description: "Custom logic for displaying the label.",
      defaultValue: "Default",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Set the state for full width.",
      defaultValue: false,
    },
    multiple: {
      control: { type: "boolean" },
      description: "Set the state whether auto complete should accept single or multiple.",
      defaultValue: false,
    },
    clearIcon: {
      control: { type: "select" },
      options: ["default","clear", "cancel"],
      description: "The icon displayed at the start of the button.",
    },
    renderTags: {
      control: { type: "select" },
      options: ["default", "styledChips", "customBox", "limitTags"],
      description: "Customize how selected tags are displayed.",
      defaultValue: "default",
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

const iconMap = {
  default:undefined,
  clear: <ClearIcon />,
  cancel: <CancelIcon />,
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const getRenderTags = (type) => {
    switch (type) {
      case "styledChips":
        return (value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.label}
              label={`${option.label} 🎬`}
              {...getTagProps({ index })}
              sx={{ backgroundColor: "lightblue", color: "black" }}
            />
          ));
  
      case "customBox":
        return (value, getTagProps) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {value.map((option, index) => (
              <Box
                key={option.label}
                sx={{
                  padding: "5px 10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderRadius: "5px",
                }}
                {...getTagProps({ index })}
              >
                {option.label}
              </Box>
            ))}
          </Box>
        );
  
      case "limitTags":
        return (value, getTagProps) => {
          const visibleTags = value.slice(0, 2);
          return [
            ...visibleTags.map((option, index) => (
              <Chip key={option.label} label={option.label} {...getTagProps({ index })} />
            )),
            value.length > 2 && <span key="more">+{value.length - 2} more</span>,
          ];
        };
  
      default:
        return undefined;
    }
  };

  const getRenderOption = (type) => {
    switch (type) {
      case "withImages":
        return (props, option) => (
          <li {...props} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.imageUrl}
              alt={option.label}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: "50%",
              }}
            />
            <span>{option.label}</span>
          </li>
        );
      case "detailed":
        return (props, option) => (
          <li {...props} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.imageUrl}
              alt={option.label}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: "50%",
              }}
            />
            <div>
              <strong>{option.label}</strong>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {option.description}
              </div>
            </div>
          </li>
        );
      default:
        return null;
    }
  };

  const getLabelOptions = {
    Default: (option) => option.label || option,
    WithYear: (option) =>
      `${option.label || option} (${option.year || "Year unknown"})`,
  };
  console.log("::Selected value", selectedValue);
  const handleOptionSelect = (_,newValue) => {
    setSelectedValue(newValue);
  }
  return (
    <MyAutoComplete
      {...args}
      value={selectedValue}
      onChange={(_, newValue) => handleOptionSelect(_,newValue)}
      renderOption={getRenderOption(args.renderOption)}
      getOptionLabel={getLabelOptions[args.getOptionLabel]}
      clearIcon={iconMap[args.clearIcon]}
      renderTags={getRenderTags(args.renderTags)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  disablePortal: false,
  minWidth: "300px",
  borderRadius: "10px",
  placeholder: "+ Movies",
  borderColor: "black",
  labelColor: "black",
  optionBoxBorderRadius: "8px",
  optionBoxPadding: "8px",
  fontSize: "14px",
  optionBoxFontSize: "14px",
  error: false,
  helperText: "Please select valid option.",
  disabled: false,
  loading: false,
  loadingText: "",
  options: top100Films,
  noOptionsText: "",
  className: "",
  listBoxClassName: "",
  label: "Movie",
  hoverOptionBgColor: "rgba(0, 0, 0, 0.1)",
  getOptionLabel: "Default",
  fullWidth: false,
  renderTags: "default",
};

// export const WithoutPortal = Template.bind({});
// WithoutPortal.args = {
//   ...Default.args,
//   disablePortal: true,
// };

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
//   loadingText: "Loading...",
// };

// export const NoOptions = Template.bind({});
// NoOptions.args = {
//   ...Default.args,
//   options: [],
//   noOptionsText: "No options...",
// };

// export const CustomRenderedOptions = Template.bind({});
// CustomRenderedOptions.args = {
//   ...Default.args,
//   options: [
//     {
//       label: "The Shawshank Redemption",
//       year: 1994,
//       imageUrl: "/shaw_shank.jpg",
//       description: "A story of hope and friendship.",
//     },
//     {
//       label: "The Godfather",
//       year: 1972,
//       imageUrl: "/godfather.jpg",
//       description: "A tale of power and loyalty.",
//     },
//     {
//       label: "The Dark Knight",
//       year: 2008,
//       imageUrl: "/dark_night.jpg",
//       description: "A superhero masterpiece.",
//     },
//   ],
//   renderOption: "detailed",
// };
