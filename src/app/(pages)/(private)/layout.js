"use client";

import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/utils";
import { AppContextProvider } from "@/context/AppContext";
import { Box } from "@mui/material";
import Header from "@/components/Header";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const [isClientUser, setIsClientUser] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const user = isUserLoggedIn();
    if (!user) {
      router.push("/signin");
    }
    setIsClientUser(user);
  }, [router]);

  if (isClientUser === null || !isClientUser) {
    return null;
  } 

  return (
    <AppContextProvider>
      <Box sx={{ display: "flex" }} className="privateLayout__container">
        <MySideDrawer open={open} setOpen={setOpen} />
        <Box display={'flex'} flexDirection={'column'} width={open ? 'calc(100% - 300px)' : 'calc(100% - 88px)'} position={'relative'} minHeight={'100vh'}>
          <Header />
        <main style={{ flexGrow: 1, padding: "24px" }}>
          {children}
        </main>
        </Box>
      </Box>
    </AppContextProvider>
  );
}
