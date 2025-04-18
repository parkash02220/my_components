import React from 'react';
import { Drawer, Paper, Box } from '@mui/material';

const RightDrawer = ({ open, handleDrawer, header, children, footer, className }) => {

  return (
    <Drawer
      className={className}
      anchor="right"
      open={open}
      onClose={handleDrawer}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Paper
        className="right_drawer_paper"
        sx={{
          width: 480,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 8px 10px -5px rgba(145 158 171 / 0.2), 0px 16px 24px 2px rgba(145 158 171 / 0.14), 0px 6px 30px 5px rgba(145 158 171 / 0.12)',
        }}
      >
        {header && (
            header
        )}

        <Box sx={{ flexGrow: 1, overflowY: 'auto', }}>
          {children}
        </Box>

        {footer && (
          <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
            {footer}
          </Box>
        )}
      </Paper>
    </Drawer>
  );
};

export default RightDrawer;
