import Cookies from "js-cookie";

export default function useAuthStatus() {
  return !!Cookies.get("auth_token");
}