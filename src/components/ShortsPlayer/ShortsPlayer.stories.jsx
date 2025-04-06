import React from "react";
import ShortsPlayer from "./ShortsPlayer";
import shortsData from "./shortsData";

const buildStyleFromArgs = (args, prefix) =>
  Object.entries(args)
    .filter(([key]) => key.startsWith(`${prefix}_`))
    .reduce((acc, [key, value]) => {
      acc[key.replace(`${prefix}_`, "")] = value;
      return acc;
    }, {});

export default {
  title: "Components/ShortsPlayer",
  component: ShortsPlayer,
  parameters: {
    docs: {
      description: {
        component:
          "A Shorts component to display short-form video content with various customization options.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of short videos.",
    },
    container_width: {
      control: "text",
      description: "Set width for the main container.",
      table: { category: "Main Container Styles" },
    },
    container_backgroundColor: {
      control: "select",
      options: [
        "#000",
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
      description: "Background color of the container.",
      table: { category: "Main Container Styles" },
    },
    motionCard_height: {
      control: "text",
      description: "Height for the motion card.",
      table: { category: "Motion Card Styles" },
    },
    motionCard_width: {
      control: "text",
      description: "Width for the motion card.",
      table: { category: "Motion Card Styles" },
    },
    motionCard_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description:
        "Apply justifyContent property on the childs of  motion card.",
      table: { category: "Motion Card Styles" },
    },
    motionCard_alignItems: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "start",
        "end",
        "self-start",
        "self-end",
      ],
      description: "Apply alignItems property on the childs of  motion card.",
      table: { category: "Motion Card Styles" },
    },
    motionCard_backgroundColor: {
      control: "select",
      options: [
        "#0f0f0f",
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
      description: "Background color of  motion card.",
      table: { category: "Motion Card Styles" },
    },
    navBtnContainer_width: {
      control: "text",
      description: "Width of the container of navigation buttons.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_height: {
      control: "text",
      description: "Height of the container of navigation buttons.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      description:
        "Apply flex direction property on the childs of the navigation button container.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_gap: {
      control: "text",
      description: "Gap between children of navigation button container.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description:
        "Apply justifyContent property on the childs of  navigation button container.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_alignItems: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "start",
        "end",
        "self-start",
        "self-end",
      ],
      description:
        "Apply alignItems property on the childs of  navigation button container.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtnContainer_padding: {
      control: "text",
      description: "Padding of navigation button container.",
      table: { category: "Navigation Buttons Container Styles" },
    },
    navBtn_width: {
      control: "text",
      description: "Width of the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_height: {
      control: "text",
      description: "Height of the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_bgcolor: {
      control: "select",
      options: [
        "rgb(39,39,39)",
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
      description: "Background color of the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_borderRadius: {
      control: "text",
      description: "Border radius of the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_hoverBgColor: {
      control: "select",
      options: [
        "rgba(128, 128, 128, 0.5)",
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
      description: "Hover background color of the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_iconColor: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the icon inside the navigation button.",
      table: { category: "Navigation Button Styles" },
    },
    navBtn_iconSize: {
      control: "text",
      description:
        "Size of the icon inside the navigation button (e.g. '1.5rem').",
      table: { category: "Navigation Button Styles" },
    },
    card_width: {
      control: "object",
      description: "Responsive width of the shorts card.",
      table: { category: "Card Styles" },
    },
    card_height: {
      control: "text",
      description: "Height of the shorts card.",
      table: { category: "Card Styles" },
    },
    card_bgColor: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background color of the shorts card.",
      table: { category: "Card Styles" },
    },
    card_flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      description: "Flex direction of the shorts card.",
      table: { category: "Card Styles" },
    },
    card_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description: "Justify content of the shorts card.",
      table: { category: "Card Styles" },
    },
    card_alignItems: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "start",
        "end",
        "self-start",
        "self-end",
      ],
      description: "Align items in the shorts card.",
      table: { category: "Card Styles" },
    },
    card_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Text color in the shorts card.",
      table: { category: "Card Styles" },
    },
    card_border: {
      control: "text",
      description: "Border of the shorts card.",
      table: { category: "Card Styles" },
    },
    cardLeftBox_flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      description: "Flex direction of the left box in the card.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description: "Justify content of the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_bgcolor: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
        "transparent",
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
      description: "Background color of the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_padding: {
      control: "text",
      description: "Padding for the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_gap: {
      control: "text",
      description: "Gap between elements in the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_borderRadius: {
      control: "text",
      description: "Border radius of the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_boxShadow: {
      control: "select",
      options: [
        "none",
        "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
        "0px 2px 8px rgba(0, 0, 0, 0.15)",
        "0px 4px 12px rgba(0, 0, 0, 0.2)",
        "0px 6px 16px rgba(0, 0, 0, 0.25)",
      ],
      description: "Box shadow of the left box.",
      table: { category: "Card Left Box Styles" },
    },
    cardLeftBox_ml: {
      control: "object",
      description: "Responsive left margin of the left box.",
      table: { category: "Card Left Box Styles" },
    },
    videoBox_width: {
      control: "text",
      description: "Width of the video box.",
      table: { category: "Video Box Styles" },
    },
    videoBox_height: {
      control: "text",
      description: "Height of the video box.",
      table: { category: "Video Box Styles" },
    },
    videoBox_borderRadius: {
      control: "text",
      description: "Border radius of the video box.",
      table: { category: "Video Box Styles" },
    },
    myLogo_width: {
      control: "text",
      description: "Width of the logo in shorts card.",
      table: { category: "My Logo Styles" },
    },
    myLogo_height: {
      control: "text",
      description: "Height of the logo in shorts card.",
      table: { category: "My Logo Styles" },
    },
    myLogo_borderRadius: {
      control: "text",
      description: "Border radius of the logo in shorts card.",
      table: { category: "My Logo Styles" },
    },
    myLogo_background: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background color of the logo  in shorts card.",
      table: { category: "My Logo Styles" },
    },
    myLogo_iconColor: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the icon inside the logo.",
      table: { category: "My Logo Styles" },
    },
    myLogo_iconSize: {
      control: "text",
      description: "Size of the icon inside the logo.",
      table: { category: "My Logo Styles" },
    },

    myTitle_fontSize: {
      control: "text",
      description: "Font size of the title.",
      table: { category: "My Title Styles" },
    },
    myTitle_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the title text.",
      table: { category: "My Title Styles" },
    },

    subscribeBtn_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Text color of the subscribe button",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_background: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background color of the subscribe button",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_fontWeight: {
      control: { type: "select" },
      options: [400, 500, 600, 700, 800],
      description: "Font weight",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_height: {
      control: "text",
      description: "Height of the button",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_textTransform: {
      control: { type: "select" },
      options: ["none", "uppercase", "lowercase", "capitalize"],
      description: "Text transform",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_fontSize: {
      control: "text",
      description: "Font size",
      table: { category: "Subscribe Button Styles" },
    },
    subscribeBtn_hoverBackground: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background on hover",
      table: { category: "Subscribe Button Styles" },
    },
    shortTitle_fontWeight: {
      control: "select",
      options: [
        "normal",
        "bold",
        "bolder",
        "lighter",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
      ],
      description: "Font weight of the short title.",
      table: { category: "Short Title Styles" },
    },
    shortTitle_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Text color of the short title.",
      table: { category: "Short Title Styles" },
    },
    shortTitle_fontSize: {
      control: "text",
      description: "Font size of the short title.",
      table: { category: "Short Title Styles" },
    },
    shortDes_variant: {
      control: "text",
      description:
        "Text variant for the short description (e.g., body2, subtitle1).",
      table: { category: "Short Description Styles" },
    },
    shortDes_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the short description.",
      table: { category: "Short Description Styles" },
    },
    shortDes_fontSize: {
      control: "text",
      description: "Font size of the short description.",
      table: { category: "Short Description Styles" },
    },
    cardRightBox_flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      description: "Flex direction of the right box in the card.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_alignItems: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "start",
        "end",
        "self-start",
        "self-end",
      ],
      description: "Align items in the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description: "Justify content in the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_p: {
      control: "text",
      description: "Padding of the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_bgcolor: {
      control: "select",
      options: [
        "#0f0f0f",
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
      description: "Background color of the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_gap: {
      control: "text",
      description: "Gap between elements in the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardRightBox_width: {
      control: "object",
      description: "Responsive width of the right box.",
      table: { category: "Card Right Box Styles" },
    },
    cardBtnBox_display: {
      control: "text",
      description: "CSS display property for the button box.",
      table: { category: "Card Button Box Styles" },
    },
    cardBtnBox_flexDirection: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      description: "Flex direction of the button box.",
      table: { category: "Card Button Box Styles" },
    },
    cardBtnBox_justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "end",
        "left",
        "right",
      ],
      description: "Justify content of the button box.",
      table: { category: "Card Button Box Styles" },
    },
    cardBtnBox_alignItems: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "start",
        "end",
        "self-start",
        "self-end",
      ],
      description: "Align items in the button box.",
      table: { category: "Card Button Box Styles" },
    },
    cardBtnBox_gap: {
      control: "text",
      description: "Gap between buttons in the button box.",
      table: { category: "Card Button Box Styles" },
    },
    cardIcon_bgcolor: {
      control: "select",
      options: [
        "rgb(39,39,39)",
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
      description: "Background color of the icon container.",
      table: { category: "Card Icon Styles" },
    },
    cardIcon_hoverBgColor: {
      control: "select",
      options: [
        "rgba(128, 128, 128, 0.5)",
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
      description: "Hover background color of the icon container.",
      table: { category: "Card Icon Styles" },
    },
    cardIcon_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Icon color.",
      table: { category: "Card Icon Styles" },
    },
    cardIcon_width: {
      control: "object",
      description: "Responsive width of the icon container.",
      table: { category: "Card Icon Styles" },
    },
    cardIcon_height: {
      control: "object",
      description: "Responsive height of the icon container.",
      table: { category: "Card Icon Styles" },
    },
    cardIconbtnLogo_width: {
      control: "object",
      description: "Responsive width of the icon button logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    cardIconbtnLogo_height: {
      control: "object",
      description: "Responsive height of the icon button logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    cardIconbtnLogo_borderRadius: {
      control: "text",
      description: "Border radius of the icon button logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    cardIconbtnLogo_background: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background color of the icon button logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    cardIconbtnLogo_iconSize: {
      control: "text",
      description: "Size of the icon in the logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    cardIconbtnLogo_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the icon in the logo.",
      table: { category: "Card Icon Button Logo Styles" },
    },
    loadingBox_width: {
      control: "text",
      description: "Width of the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_display: {
      control: { type: "select" },
      options: ["flex", "block", "inline-block", "grid", "inline-flex"],
      description: "Display property of the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_alignItems: {
      control: { type: "select" },
      options: ["center", "flex-start", "flex-end", "stretch", "baseline"],
      description: "Align items inside the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_justifyContent: {
      control: { type: "select" },
      options: [
        "center",
        "flex-start",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      description: "Justify content inside the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_bgcolor: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Background color of the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_padding: {
      control: "text",
      description: "Padding inside the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_borderRadius: {
      control: "text",
      description: "Border radius of the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_color: {
      control: "select",
      options: [
        "rgba(255,255,255,0.75)",
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
      description: "Color of the loading icon inside the loading box.",
      table: { category: "Loading Box Styles" },
    },

    loadingBox_boxShadow: {
      control: "select",
      options: [
        "none",
        "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
        "0px 2px 8px rgba(0, 0, 0, 0.15)",
        "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
        "0px 8px 24px rgba(0, 0, 0, 0.4)",
      ],
      description: "Box shadow of the loading box.",
      table: { category: "Loading Box Styles" },
    },

    tooltipTitle_navBtnUp: {
      control: "text",
      description: "Tooltip text for the 'Previous video' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_navBtnUp: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Previous video' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipTitle_navBtnDown: {
      control: "text",
      description: "Tooltip text for the 'Next video' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_navBtnDown: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Next video' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipTitle_likeBtn: {
      control: "text",
      description: "Tooltip text for the 'Like' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_likeBtn: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Like' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipTitle_dislikeBtn: {
      control: "text",
      description: "Tooltip text for the 'Dislike' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_dislikeBtn: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Dislike' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipTitle_viewsBtn: {
      control: "text",
      description: "Tooltip text for the 'Views' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_viewsBtn: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Views' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipTitle_shareBtn: {
      control: "text",
      description: "Tooltip text for the 'Share' button.",
      table: { category: "Tooltip Settings" },
    },
    tooltipPlacement_shareBtn: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for the 'Share' button.",
      table: { category: "Tooltip Settings" },
    },
    loading: {
      control: "boolean",
      description: "Loading state for the shorts component.",
    },
  },
};

const Template = (args) => {
  const styleNames = [
    "container",
    "motionCard",
    "navBtnContainer",
    "navBtn",
    "card",
    "cardLeftBox",
    "videoBox",
    "myLogo",
    "myTitle",
    "subscribeBtn",
    "shortTitle",
    "shortDes",
    "cardRightBox",
    "cardBtnBox",
    "cardIcon",
    "cardIconbtnLogo",
    "loadingBox",
  ];

  const styleProps = styleNames.reduce((acc, name) => {
    const propName = `${name}Styles`;
    acc[propName] = buildStyleFromArgs(args, name);
    return acc;
  }, {});

  return <ShortsPlayer {...args} {...styleProps} />;
};

export const Default = Template.bind({});
Default.args = {
  subscribeBtn_color: "black",
  subscribeBtn_background: "white",
  subscribeBtn_fontWeight: 700,
  subscribeBtn_height: "32px",
  subscribeBtn_textTransform: "none",
  subscribeBtn_fontSize: "12px",
  subscribeBtn_hoverBackground: "rgba(255,255,255,0.75)",
  container_width: "100%",
  container_backgroundColor: "#000",
  motionCard_height: "100%",
  motionCard_width: "100%",
  motionCard_justifyContent: "center",
  motionCard_alignItems: "center",
  motionCard_backgroundColor: "#0f0f0f",
  navBtnContainer_width: "200px",
  navBtnContainer_height: "100%",
  navBtnContainer_flexDirection: "column",
  navBtnContainer_gap: "16px",
  navBtnContainer_justifyContent: "center",
  navBtnContainer_alignItems: "end",
  navBtnContainer_padding: "16px",

  navBtn_width: "56px",
  navBtn_height: "56px",
  navBtn_bgcolor: "rgb(39,39,39)",
  navBtn_borderRadius: "50%",
  navBtn_hoverBgColor: "rgba(128, 128, 128, 0.5)",
  navBtn_iconColor: "white",
  navBtn_iconSize: "1.5rem",

  card_width: { xs: "100%", sm: "500px", md: "600px" },
  card_height: "calc(100% - 24px)",
  card_bgColor: "#0f0f0f",
  card_flexDirection: "column",
  card_justifyContent: "flex-end",
  card_alignItems: "center",
  card_color: "white",
  card_border: "1px solid #0f0f0f",
  cardLeftBox_flexDirection: "column",
  cardLeftBox_justifyContent: "flex-end",
  cardLeftBox_bgcolor: "transparent",
  cardLeftBox_padding: "16px",
  cardLeftBox_gap: "8px",
  cardLeftBox_borderRadius: "20px",
  cardLeftBox_boxShadow:
    "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
  videoBox_width: "100%",
  videoBox_height: "100%",
  videoBox_borderRadius: "20px",
  cardLeftBox_ml: { xs: "60px", md: "0px" },
  myLogo_width: "32px",
  myLogo_height: "32px",
  myLogo_borderRadius: "50%",
  myLogo_background: "white",
  myLogo_iconColor: "red",
  myLogo_iconSize: "2rem",
  myTitle_fontSize: "14px",
  myTitle_color: "white",
  shortTitle_fontWeight: "bold",
  shortTitle_color: "white",
  shortTitle_fontSize: "16px",
  shortDes_variant: "body2",
  shortDes_color: "white",
  shortDes_fontSize: "16px",
  cardRightBox_flexDirection: "column",
  cardRightBox_alignItems: "center",
  cardRightBox_justifyContent: "flex-end",
  cardRightBox_p: "12px 12px 0px",
  cardRightBox_bgcolor: "#0f0f0f",
  cardRightBox_gap: "16px",
  cardRightBox_width: { xs: "60px", sm: "72px" },
  cardBtnBox_display: "flex",
  cardBtnBox_flexDirection: "column",
  cardBtnBox_justifyContent: "center",
  cardBtnBox_alignItems: "center",
  cardBtnBox_gap: "8px",
  cardIcon_bgcolor: "rgb(39,39,39)",
  cardIcon_hoverBgColor: "rgba(128, 128, 128, 0.5)",
  cardIcon_color: "white",
  cardIcon_width: { xs: "40px", sm: "48px" },
  cardIcon_height: { xs: "40px", sm: "48px" },
  cardIconbtnLogo_width: { xs: "32px", sm: "40px" },
  cardIconbtnLogo_height: { xs: "32px", sm: "40px" },
  cardIconbtnLogo_borderRadius: "6px",
  cardIconbtnLogo_background: "white",
  cardIconbtnLogo_iconSize: "2rem",
  cardIconbtnLogo_color: "red",
  loadingBox_width: "100%",
  loadingBox_display: "flex",
  loadingBox_alignItems: "center",
  loadingBox_justifyContent: "center",
  loadingBox_bgcolor: "black",
  loadingBox_padding: "16px",
  loadingBox_borderRadius: "20px",
  loadingBox_color: "white",
  loadingBox_boxShadow:
    "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
  tooltipTitle_navBtnUp: "Previous video",
  tooltipPlacement_navBtnUp: "left",
  tooltipTitle_navBtnDown: "Next video",
  tooltipPlacement_navBtnDown: "left",
  tooltipTitle_likeBtn: "I like this vide",
  tooltipPlacement_likeBtn: "left",
  tooltipTitle_dislikeBtn: "I dislike this video",
  tooltipPlacement_dislikeBtn: "left",
  tooltipTitle_viewsBtn: "View",
  tooltipPlacement_viewsBtn: "left",
  tooltipTitle_shareBtn: "Share",
  tooltipPlacement_shareBtn: "left",
  loading: false,
  items: shortsData,
};
