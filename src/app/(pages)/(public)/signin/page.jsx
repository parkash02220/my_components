"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/reducers/auth/authThunk";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { isUserLoggedIn } from "@/utils";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const {error,loading} = useSelector((state)=>state.auth);
  const user = isUserLoggedIn();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setError("all fields are necessary");
      return;
    }

    dispatch(loginUser({email,password}));

    
  };
console.log("::user",user)
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);



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
              {error && (
                <div style={{ fontSize: "13px", color: "red" }}>{error}</div>
              )}
              <MyButton type="submit" fullWidth={true} loading={loading}>
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
