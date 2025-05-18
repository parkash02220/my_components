import useToast from "@/hooks/common/useToast";
import { setAuthTokenToCookies } from "@/utils";
import { useRouter } from "next/navigation";

const { ApiCall } = require("@/utils/ApiCall");
const { useState } = require("react");
const useSignUp = () => {
  const toastId = "register_toast";
  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const signUpUser = async (userData) => {
    showToast({
      toastId,
      type: "loading",
      message: "Creating your account...",
    });
    setResponseMsg("");
    setLoading(true);
    setError(false);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
      method: "Post",
      body: userData,
    });

    if (res.error) {
      setLoading(false);
      showToast({
        toastId,
        type: "error",
        message: "Registration failed. Please try again.",
      });
      console.log("::error while signing up user", res);
      setError(true);
      setResponseMsg(res?.error?.data?.error || "");
      return;
    }
    setLoading(false);
    const { token } = res?.data;
    if (token) {
      showToast({
        toastId,
        type: "success",
        message: "Account created successfully! Welcome aboard.",
      });
      setAuthTokenToCookies(token);
      router.push("/home");
    }
  };

  return {
    loadingSignUp: loading,
    errorSignUp: error,
    responseMsg,
    signUpUser,
  };
};

export default useSignUp;
