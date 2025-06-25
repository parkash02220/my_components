"use client";

import { Box } from "@mui/material";
import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  fullWidth,
  layout = "intrinsic",
  objectFit = "cover",
  sizes = "100vw",
  priority = false,
  className = "",
  placeholder = "empty",
  blurDataURL,
  sx = {},
  style = {},
  ...rest
}) => {
  const isFill = layout === "fill";

  return (
    <Box
      className={className}
      sx={{
        position: isFill ? "relative" : "initial",
        width: isFill || fullWidth ? "100%" : width,
        height: isFill ? "100%" : height,
        lineHeight: 0,
        ...sx,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={isFill || fullWidth ? undefined : width}
        height={isFill ? undefined : height}
        fill={isFill}
        sizes={sizes}
        style={{ objectFit, ...style }}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...rest}
      />
    </Box>
  );
};

export default ResponsiveImage;
