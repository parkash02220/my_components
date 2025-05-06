"use client";

import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/utils";
import { AppContextProvider } from "@/context/AppContext";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import useBreakpointFlags from "@/hooks/common/useBreakpointsFlag";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const [isClientUser, setIsClientUser] = useState(null);
  const { isMd } = useBreakpointFlags();
  const [open, setOpen] = useState(true);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  useEffect(() => {
    const user = isUserLoggedIn();
    if (!user) {
      router.push("/signin");
    }
    setIsClientUser(user);
  }, [router]);

  useEffect(()=>{
    router.prefetch("/signin")
  },[])

  if (isClientUser === null || !isClientUser) {
    return null;
  }

  return (
    <AppContextProvider>
      <Box sx={{ display: "flex" }} className="privateLayout__container">
        <MySideDrawer open={open} setOpen={setOpen} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={
            isMd ? "100%" : open ? "calc(100% - 300px)" : "calc(100% - 88px)"
          }
          position={"relative"}
          height={"100vh"}
        >
          <Header
            profileDrawerOpen={profileDrawerOpen}
            setProfileDrawerOpen={setProfileDrawerOpen}
          />
          <main
            style={{
              flexGrow: 1,
              padding: isMd ? "24px 0px 0px 0px" : "24px",
              height: "calc(100vh - 75px",
              paddingBottom: "4px",
            }}
          >
            {children}
          </main>
        <Box display={'flex'} flexDirection={'column'} width={open ? 'calc(100% - 300px)' : 'calc(100% - 88px)'} position={'relative'} height={'100vh'}>
          <Header/>
        <main style={{ flexGrow: 1, padding: "24px",height:'calc(100vh - 75px',paddingBottom:"4px" }}>
          {children}
        </main>
        </Box>
      </Box>
      </Box>
    </AppContextProvider>
  );
}
