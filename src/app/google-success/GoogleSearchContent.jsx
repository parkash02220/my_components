"use client";
import { setAuthTokenToCookies } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("::google search page");
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      console.log("::token from google", token);
      setAuthTokenToCookies(token);
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [searchParams]);

  return <p>Signing you in...</p>;
};

export default GoogleSuccessContent;
