"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { setAuthTokenToCookies } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useState } from "react";
import useLogin from "@/hooks/common/useLogin";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loadingLogin, loginUser } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setErrorMsg("all fields are necessary");
      return;
    }
    loginUser(email, password, setErrorMsg);
  };

  return (
    <>
      <Box
        className="loginContainer"
        width={"100%"}
        minHeight={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          className="loginBox"
          width={"100%"}
          maxWidth={"700px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"8px"}
          p={2}
          sx={{
            boxShadow: "0px 8px 32px rgba(31, 38, 135, 0.2)",
            borderRadius: "20px",
          }}
        >
          <Typography width={"100%"} textAlign={"center"}>
            LOGIN
          </Typography>
          <form className="loginForm" onSubmit={handleSubmit}>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <MyTextField
                fullWidth={true}
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                label="Email"
              />
              <MyTextField
                fullWidth={true}
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                label="Password"
              />
              {errorMsg && (
                <div style={{ fontSize: "13px", color: "red" }}>{errorMsg}</div>
              )}
              <MyButton type="submit" fullWidth={true} loading={loadingLogin}>
                Login
              </MyButton>
            </Box>
          </form>
          <Link href={"/register"}>
            <Typography width={"100%"} textAlign={"end"}>
              {" "}
              Don't have an account?{" "}
              <span style={{ color: "blue" }}>Register here</span>.
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
