import React from 'react';
import { Grid, Box, Button } from '@mui/material';
const Footer = ({
  cancelButton,
  submitButton,
  handleCancel,
  handleSubmit,
  ...props
}) => {
  return (
    <Box className="drawer-footer">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box className="d-flex-3">
            <Button
              variant="outlined"
              size="large"
              type="button"
              sx={{
                mr: 2,
                borderRadius: '14px',
                minWidth: '150px',
                fontSize: '16px',
                padding: '8px 10px',
              }}
              onClick={handleCancel}
            >
              {cancelButton || 'Cancel'}
            </Button>

              <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  borderRadius: '14px',
                  minWidth: '150px',
                  fontSize: '16px',
                  padding: '8px 10px',
                  backgroundColor: "whitesmoke",
                }}
              >
                {submitButton || t('Submit')}
              </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
