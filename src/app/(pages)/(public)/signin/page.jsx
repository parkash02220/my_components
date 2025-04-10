"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyButton from "@/components/MyButton/MyButton";
import MyTextField from "@/components/MyTextfield/MyTextfield";
import { setAuthTokenToCookies } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setErrorMsg("all fields are necessary");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
      method: "POST",
      body: {
        email,
        password,
      },
    });

    setLoading(false);

    console.log("::res", res);
    if (res.error) {
      const error = res?.error?.data?.error || {};
      console.log("::error.msg", error);
      setErrorMsg(error);
      return;
    }
    const { token } = res?.data;
    if (token) {
      setAuthTokenToCookies(token);
      router.push("/home");
    }
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
