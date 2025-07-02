"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Loader from "@/components/Loader/Loader";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Box height={"100dvh"}>
        <Loader />
      </Box>
    </>
  );
}
