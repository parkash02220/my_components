import MyDialog from "@/components/MyDialog/MyDialog";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AttachmentViewer = ({ attachments, selectedImage, open, handleClose }) => {
  const [images, setImages] = useState(attachments || []);
  const [startIndex, setStartIndex] = useState(selectedImage);

  useEffect(() => {
    setImages(attachments || []);
  }, [attachments]);

  useEffect(() => {
    setStartIndex(selectedImage);
  }, [selectedImage]);

  return (
    <MyDialog
      open={open}
      handleClose={handleClose}
      width={'calc(100% - 64px)'}
      height={'calc(100% - 64px)'}
      maxwidth="1200px"
      maxheight="700px"
      contentpadding="0px !important"
      content={
        <Box p={2} height="100%">
          <Swiper
           key={startIndex}
            modules={[Navigation, Pagination, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            initialSlide={startIndex}
            spaceBetween={20}
            slidesPerView={1}
            style={{ width: '100%', height: '100%' }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  bgcolor="#F4F4F4"
                  borderRadius="8px"
                >
                  <img
                 src={src ? (typeof src === "string" ? src : URL.createObjectURL(src)) : ""}
                    alt={`Image ${index}`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      }
    />
  );
};

export default AttachmentViewer;
