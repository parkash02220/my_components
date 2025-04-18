import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MyDialog = ({ open, handleClose, title, content, actions, ...props }) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open ? true : false}
        sx={{
          backdropFilter: 'blur(5px)',
        }}
        PaperProps={{
            sx: {
              minWidth: props.minWidth || '500px',
              borderRadius: props.borderRadius || '16px',
            },
          }}
        {...props}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          {...props}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent>{content}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </BootstrapDialog>
    </div>
  );
};

export default MyDialog;
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: props?.fontSize }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
