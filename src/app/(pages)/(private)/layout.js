"use client";
import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isUserLoggedIn } from "@/utils";
import { AppContextProvider } from "@/context/AppContext";

export default function HomeLayout({ children }) {
  const user = isUserLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return (
    <AppContextProvider>
      {user ? <MySideDrawer>{children}</MySideDrawer> : null}
    </AppContextProvider>
  );
}
