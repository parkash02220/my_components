"use client";
import MySideDrawer from "@/components/MySideDrawer/MySideDrawer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isUserLoggedIn } from "@/utils";

export default function HomeLayout({ children }) {
  const user = isUserLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    user ? <MySideDrawer>{children}</MySideDrawer> : null
  );
}
