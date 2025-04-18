import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material"
import MyTooltip from "../MyTooltip/MyTooltip"
import { useState } from "react"

export const RightDrawerHeader = () => {
    return <>
     <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"20px 8px 20px 20px"}
            borderBottom={"1px solid rgba(145 158 171 / 0.2)"}
          >
            <IconButton
              sx={{
                display: "flex",
                cursor: "pointer",
           
                backgroundColor: "rgba(145,158,171,0.08)",
                height: "30px",
                padding: "6px 8px",
                borderWidth: "0px",
                borderRadius: "8px",
                transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);"
              }}
            >
              <Typography sx={{
                     fontWeight: 700,
                     fontSize: "14px",
                     color:"#1C252E",
              }}>
              In progress
              </Typography>
              {" "}
              <img
                src="/dropdown-arrow.svg"
                alt="drop down icon"
                style={{ width: "16px", height: "16px" }}
              />
            </IconButton>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <MyTooltip title={"Like"} placement="bottom" >
            <IconButton
            sx={{
              padding:"8px",
              borderRadius:"50%",
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              fontSize:"1.5rem",
              color:"#00A76F",
              '&::hover':{
                background:"rgba(0,167,111,0.08)",
              }
            }}
            >
              <img src="/like.svg" alt="like" style={{width:"20px",height:"20px"}} />
            </IconButton>
            </MyTooltip>
            <MyTooltip title={"Delete task"} placement="bottom" >
            <IconButton
            sx={{
              padding:"8px",
              borderRadius:"50%",
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              fontSize:"1.5rem",
              color:"#00A76F",
              '&::hover':{
                background:"rgba(0,167,111,0.08)",
              }
            }}
            >
              <img src="/deleteIcon.svg" alt="delete" style={{width:"20px",height:"20px"}} />
            </IconButton>
            </MyTooltip>
            <IconButton
            sx={{
              padding:"8px",
              borderRadius:"50%",
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              fontSize:"1.5rem",
              color:"#00A76F",
              '&::hover':{
                background:"rgba(0,167,111,0.08)",
              }
            }}
            >
              <img src="/menuVerticalIcon.svg" alt="menu" style={{width:"20px",height:"20px"}} />
            </IconButton>
            </Box>
          </Box>
    </>
}

export const RightDrawerContent = () => {
    const [value, setValue] = useState('overview');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return <>
    <Box>

        <Box sx={{ width: '100%' }} className="editTask_tabs" padding={1}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="overview" label="Overview" />
        <Tab value="subtasks" label="Subtasks" />
        <Tab value="comments" label="Comments (0)" />
      </Tabs>
    </Box>
    </Box>
    </>
}