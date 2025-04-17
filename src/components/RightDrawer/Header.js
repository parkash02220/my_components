import React from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from 'components/Typography';

const Header = ({ title, handleCancel, ...props }) => {

  return (
    <Box
      className="d-flex-2 drawer-header"
      sx={{ width: 700 }}
    >
      <Typography
        fontSize={20}
        fontWeight={500}
        color={"black"}
      >
        {title}
      </Typography>
      <CloseIcon className="c-pointer appt-close" onClick={handleCancel} />
    </Box>
  );
};

export default Header;
