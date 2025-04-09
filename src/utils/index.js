import Cookies from "js-cookie";
export const getAuthTokenFromCookies = () => {
    return Cookies.get("auth_token");
}

export const setAuthTokenToCookies = (token) => {
    if(!token) return;
    return Cookies.set("auth_token",token,{expires: 7});
}

export const isUserLoggedIn = () => {
    const token =  getAuthTokenFromCookies();
    return !!token && token !== null && token !== "undefined";
}