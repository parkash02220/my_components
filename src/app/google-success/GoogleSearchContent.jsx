"use client";
import { setAuthTokenToCookies } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setAuthTokenToCookies(token);
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [searchParams]);

  return <p>Signing you in...</p>;
};

export default GoogleSuccessContent;
