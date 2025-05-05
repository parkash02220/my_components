import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useBreakpointFlags from '@/hooks/common/useBreakpointsFlag';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MyDialog = ({ open, handleClose, title, content, actions, ...props }) => {
  const {isXs} = useBreakpointFlags();
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
              minWidth: isXs ? "300px" : props?.minwidth || "500px",
              borderRadius: props.borderRadius || '16px',
              maxWidth: isXs ? "calc(100% - 16px)" : props?.maxwidth || "600px",
              boxShadow : props?.boxShadow,
              width:props?.width,
              maxHeight:props?.maxheight,
              height:props?.height,
              minHeight:props?.minheight,
            },
          }}
        {...props}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          // {...props}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent  sx={{ p: props?.contentpadding || 2 }}>{content}</DialogContent>
        {actions && <DialogActions sx={{p: props?.actionpadding || 1}}>{actions}</DialogActions>}
      </BootstrapDialog>
    </div>
  );
};

export default MyDialog;
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: props?.titlepadding || 2, fontSize: props?.fontSize }} {...other}>
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
