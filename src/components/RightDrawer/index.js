import React from 'react';
import { Drawer, Paper } from '@mui/material';

const RightDrawer = ({ open, handleDrawer, content, className }) => {
  const BORDER_RADIUS = '20px 0px 0px 20px !important';

  return (
    <Drawer
      className={className}
      anchor="right"
      open={open}
      onClose={handleDrawer}
      sx={{
        // backdropFilter: 'blur(5px)',
        // color:"#1C252E",
        // backgroundColor:"rgba(255,255,255,0.9)",
        // boxShadow:"-40px 40px 80px -8px rgba(145,158,171)",
      }}
    >
      <Paper
        className="right_drawer_paper"
        style={{
          width: 480,
          boxShadow: '0px 8px 10px -5px rgba(145 158 171 / 0.2),0px 16px 24px 2px rgba(145 158 171 / 0.14),0px 6px 30px 5px rgba(145 158 171 / 0.12)',
          borderRadius: BORDER_RADIUS,
          transition:"transform 225ms cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        {content}
      </Paper>
    </Drawer>
  );
};

export default RightDrawer;
