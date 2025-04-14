import Cookies from "js-cookie";
export const getAuthTokenFromCookies = () => {
    return Cookies.get("auth_token");
}

export const setAuthTokenToCookies = (token) => {
    if(!token) return;
    return Cookies.set("auth_token",token,{expires: 1});
}

export const isUserLoggedIn = () => {
    const token =  getAuthTokenFromCookies();
    return !!token && token !== null && token !== "undefined";
}

export function convertIdFields(data) {
    if (Array.isArray(data)) {
      return data.map(convertIdFields);
    } else if (data && typeof data === 'object') {
      const newObj = {};
  
      for (const key in data) {
        const value = data[key];
  
        if (key === '_id') {
          newObj['id'] = convertIdFields(value);
        } else {
          newObj[key] = convertIdFields(value);
        }
      }
  
      return newObj;
    }

    return data;
  }
  