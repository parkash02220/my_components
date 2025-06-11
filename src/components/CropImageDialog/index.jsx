import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slider,
  Box,
  Typography,
} from "@mui/material";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import MyButton from "../MyButton/MyButton";

const CropImageDialog = ({ imageSrc, open, onClose, onCropComplete }) => {
  const cropperRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleDone = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        onCropComplete(blob);
      });
    }
  };

  const handleZoomChange = (_, value) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.zoomTo(value);
      setZoom(value);
    }
  };

  const handleRotate = (angle) => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const newRotation = (rotation + angle + 360) % 360;
      cropper.rotateTo(newRotation);
      setRotation(newRotation);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent
        sx={{
          display: "flex",
          height: 400,
          gap: 2,
          position: "relative",
          alignItems: "center",
          overflow: "hidden",
          pb: 0,
        }}
      >
        <Box
          flex={1}
          position="relative"
          height="100%"
          sx={{
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Cropper
            src={imageSrc}
            style={{ height: "100%", width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={true}
            viewMode={1}
            responsive={true}
            background={false}
            rotatable={true}
            zoomable={true}
            autoCropArea={1}
            ref={cropperRef}
          />
        </Box>

        <Box
          width={60}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Typography fontSize={12}>Zoom</Typography>
          <Slider
            orientation="vertical"
            value={zoom}
            min={0.1}
            max={3}
            step={0.01}
            onChange={handleZoomChange}
            sx={{ height: 300 }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          paddingInline: 3,
          pb: 2,
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <IconButton onClick={() => handleRotate(-90)}>
            <img
              src="/rotateLeft.png"
              alt="rotate left"
              style={{ width: "24px", height: "24px" }}
            />
          </IconButton>
          <IconButton onClick={() => handleRotate(90)}>
            <img
              src="/rotateRight.png"
              alt="rotate right"
              style={{ width: "24px", height: "24px" }}
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <MyButton
            onClick={onClose}
            fontWeight={700}
            minWidth="'150px"
            fontSize={14}
            variant="outlined"
            color="#DFE3EB"
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            padding={"5px 12px"}
            border={"1px solid rgba(145,158,171,0.32)"}
          >
            Cancel
          </MyButton>
          <MyButton
            onClick={handleDone}
            minWidth="'150px"
            fontSize={14}
            color="#1C252E"
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            padding={"5px 12px"}
            border={"1px solid rgba(145,158,171,0.32)"}
            fontWeight={700}    
          >
            Upload
          </MyButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CropImageDialog;
