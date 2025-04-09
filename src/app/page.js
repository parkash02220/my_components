"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { getAuthTokenFromCookies, isUserLoggedIn } from "@/utils";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = isUserLoggedIn();

    if (user) {
      router.push("/home");
    } else {
      router.push("/signin");
    }
  }, [router]);

  return <>
  <Box sx={{
    width:"100%",
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }}>
    <CircularProgress />
  </Box>
  </>;
}