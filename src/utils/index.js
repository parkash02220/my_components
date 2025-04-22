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
  
  import debounce from "lodash.debounce";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data?.url) {
      setAllImages((prev) =>
        prev.map((img) => (img.tempId === file.tempId ? data.url : img))
      );
    }
  } catch (error) {
    console.error("Upload failed", error);
  }
};

const debouncedUpload = debounce(uploadImage, 1000);