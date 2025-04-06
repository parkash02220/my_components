"use client";

import MyAutoComplete from "@/components/MyAutoComplete/MyAutoComplete";
import top100Films from "@/components/MyAutoComplete/top100films";
import MyButton from "@/components/MyButton/MyButton";
import MySearch from "@/components/MySearch/MySearch";
import dummyOptions from "@/components/MySelect/dummyOptions";
import MySelect from "@/components/MySelect/MySelect";
import MySwitch from "@/components/MySwitch/MySwitch";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import shortsData from "@/components/ShortsPlayer/shortsData";
import ShortsPlayer from "@/components/ShortsPlayer/ShortsPlayer";
import { Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Home() {
  const components = [
    "autocomplete",
    "button",
    "search",
    "select",
    "switch",
    "textfield",
    "shortsplayer",
  ];

  const [component, setComponent] = useState("autocomplete");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [value, setValue] = useState("");

  const handleChangeTextfield = (event) => {
    setValue(event.target.value);
  };
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
    console.log("::handle switch change ", event);
  };

  const renderComponent = () => {
    switch (component) {
      case "autocomplete":
        return <MyAutoComplete
        value={selectedMovie}
        onChange={(_, val) => setSelectedMovie(val)}
        borderRadius={"8px"}
        placeholder={"+ Movies"}
        borderColor={"black"}
        labelColor={"black"}
        optionBoxBorderRadius={"8px"}
        optionBoxFontSize={"14px"}
        fontSize={"14px"}
        options={top100Films}
        label={"Movie"}
        width={"600px"}
        getOptionLabel={(option) =>
          `${option.label || "label"} ${option.year || "year"}`
        }
        />;
      case "button":
        return <MyButton
        variant={"variant"}
        backgroundColor={'black'}
        loading={true}
        loadingIndicator={"/loading1.svg"}
        />;
      case "search":
        return <MySearch />;
      case "select":
        return <MySelect
        options={dummyOptions}
        />;
      case "switch":
        return <MySwitch
        checked={checked}
        onChange={handleSwitchChange}
        size="medium"
        startIcon={<NotificationsIcon />}
        required={true}
        />;
      case "textfield":
        return <MyTextField
        value={value}
        onChange={handleChangeTextfield}
        required={true}
        type="date"
        />;
      case "shortsplayer":
        return <ShortsPlayer
        items={shortsData}
        actions={{
          handleLike: () => console.log("::like button clicked"),
          handleDislike: () => console.log("::dislike button clicked"),
          handleView: () => console.log("::view button clicked"),
          handleShare: () => console.log("::share button clicked"),
          handleSubscribe: () => console.log("::subscribe button clicked"),
          handleMenu: () => console.log("::Menu button clicked"),
        }}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap",justifyContent:"center",p:2, mb: 4,height:'50px' }}>
        {components.map((name) => (
          <Button
            key={name}
            variant={component === name ? "contained" : "outlined"}
            onClick={() => setComponent(name)}
          >
            {name}
          </Button>
        ))}
      </Box>

      <Box sx={{display:'flex',justifyContent:'center'}} className="componentContainer">
        {renderComponent()}
      </Box>
    </>
  );
}
