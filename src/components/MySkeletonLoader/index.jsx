import React from "react";
import { Skeleton, Stack } from "@mui/material";

const MySkeletonLoader = ({
  variant = "text",
  width = "100%",
  height = 40,
  animation = "wave",
  count = 1,
  sx = {},
}) => {
  return (
    <Stack spacing={1}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          animation={animation}
          width={width}
          height={height}
          sx={sx}
        />
      ))}
    </Stack>
  );
};

export default MySkeletonLoader;
