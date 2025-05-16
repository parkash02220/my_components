"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { getAuthTokenFromCookies, isUserLoggedIn } from "@/utils";
import Loader from "@/components/Loader/Loader";
import useLogout from "@/hooks/user/activeUser/useLogout";

export default function Page() {
  const router = useRouter();
  const [isMounted,setIsMounted] = useState(false);
  const {loadingLogout,logoutUser} = useLogout();
  useEffect(() => {
    const user = isUserLoggedIn();

    if (user) {
      router.push("/home");
    } else {
      logoutUser();
    }
  }, [router]);

  useEffect(()=>{
    setIsMounted(true);
  },[]);

  if(!isMounted) return null;

  return <>
  <Box height={'100vh'}>
  <Loader />
  </Box>
  </>;
}