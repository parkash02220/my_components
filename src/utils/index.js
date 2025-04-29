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


export function getTimeAgo(updatedAt) {
  const updatedDate = new Date(updatedAt);
  const now = new Date();
  const diffMs = now - updatedDate;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffHours < 1) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} before`;
  }
  return `${diffHours} hour${diffHours !== 1 ? "s" : ""} before`;
}

export function formatDueDateRange(due_start_date, due_end_date) {
  if(!due_start_date && !due_end_date) return "Select due date";
  const start = new Date(due_start_date);
  const end = new Date(due_end_date);

  const optionsDay = { day: 'numeric' };
  const optionsMonth = { month: 'short' };
  const optionsMonthDay = { month: 'short', day: 'numeric' };
  const optionsFull = { month: 'short', day: 'numeric', year: 'numeric' };

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = start.getMonth() === end.getMonth() && sameYear;

  if (sameMonth) {
    const startDay = start.toLocaleDateString(undefined, optionsDay);
    const endFull = end.toLocaleDateString(undefined, optionsFull);
    return `${startDay}-${endFull}`;
  } else if (sameYear) {
    const startPart = start.toLocaleDateString(undefined, optionsMonthDay);
    const endPart = end.toLocaleDateString(undefined, optionsFull);
    return `${startPart} - ${endPart}`;
  } else {
    const startFull = start.toLocaleDateString(undefined, optionsFull);
    const endFull = end.toLocaleDateString(undefined, optionsFull);
    return `${startFull} - ${endFull}`;
  }
}

export function getFullName(firstName,lastName){
  if(!firstName && !lastName) return "";
  const name = `${firstName?.trim()} ${lastName.trim()}`;
  return name || '';
}
export function capitalizeFirstLetter(string){
    if(typeof(string) !== "string") return string;
    if(string?.trim() === "") return "";
    const formattedString = string?.charAt(0)?.toUpperCase() + string?.slice(1);
    return formattedString;
}