import Cookies from "js-cookie";
import { formatDistanceToNowStrict } from "date-fns";
export const getAuthTokenFromCookies = () => {
  return Cookies.get("auth_token");
};

export const setAuthTokenToCookies = (token) => {
  if (!token) return;
  return Cookies.set("auth_token", token, { expires: 1 });
};
export const setCookie = (name, value) => {
  if (!name || !value) return;
  return Cookies.set(name, value, { expires: 1 });
};
export const getCookie = (name) => {
  if (!name) return;
  return Cookies.get(name);
};
export const isUserLoggedIn = () => {
  const token = getAuthTokenFromCookies();
  return !!token && token !== null && token !== "undefined";
};

export function convertIdFields(data) {
  if (Array.isArray(data)) {
    return data.map(convertIdFields);
  } else if (data && typeof data === "object") {
    const newObj = {};

    for (const key in data) {
      const value = data[key];

      if (key === "_id") {
        newObj["id"] = convertIdFields(value);
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

// export function getTimeAgo(updatedAt) {
//   const updatedDate = new Date(updatedAt);
//   const now = new Date();
//   const diffMs = now - updatedDate;

//   const diffMinutes = Math.floor(diffMs / (1000 * 60));
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (diffMinutes < 1) return "Just now";
//   if (diffHours < 1) {
//     return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} before`;
//   }
//   if (diffDays < 1) {
//     return `${diffHours} hour${diffHours !== 1 ? "s" : ""} before`;
//   }
//   return `${diffDays} day${diffDays !== 1 ? "s" : ""} before`;
// }

export function getTimeAgo(updatedAt) {
  const now = new Date();
  const updatedDate = new Date(updatedAt);
  const diffInSeconds = (now - updatedDate) / 1000;

  if (diffInSeconds < 60) {
    return "Just now";
  }

  return formatDistanceToNowStrict(updatedDate, {
    addSuffix: true,
  });
}

export function formatDueDateRange(due_start_date, due_end_date) {
  if (!due_start_date && !due_end_date) return "Select due date";

  const start = new Date(due_start_date);
  const end = new Date(due_end_date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  if (isSameDay(end, today)) return "Today";
  if (isSameDay(end, tomorrow)) return "Tomorrow";

  const optionsDay = { day: "numeric" };
  const optionsMonthDay = { month: "short", day: "numeric" };
  const optionsFull = { month: "short", day: "numeric", year: "numeric" };

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = start.getMonth() === end.getMonth() && sameYear;

  if (isSameDay(start, today)) {
    return end.toLocaleDateString(undefined, optionsFull);
  }

  if (isSameDay(start, end)) {
    return end.toLocaleDateString(undefined, optionsFull);
  }

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

export function getFullName(firstName, lastName) {
  if (!firstName && !lastName) return "";
  const name = `${firstName?.trim() || ""} ${lastName?.trim() || ""}`;
  return name || "";
}
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string") return string;
  if (string?.trim() === "") return "";
  const formattedString = string?.charAt(0)?.toUpperCase() + string?.slice(1);
  return formattedString;
}

export const loginUserWithGoogle = async (router) => {
  if (router) {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`);
  }
};

export const sendTyping = (socket, roomId, userId) => {
  if (socket && roomId && userId) {
    socket.emit("typing", { roomId, userId });
  }
};

export const stopTyping = (socket, roomId, userId) => {
  if (socket && roomId && userId) {
    socket.emit("stopTyping", { roomId, userId });
  }
};

export const getInitialsOfString = (input) => {
  if (typeof input !== "string" || !input.trim()) return "";

  const words = input.trim().split(/\s+/).filter(Boolean);

  const initials = words.slice(0, 2).map((word) => {
    const firstLetter = [...word].find((char) => /\p{L}/u.test(char));
    return firstLetter ? firstLetter.toUpperCase() : "";
  });

  if (initials.length === 1) {
    return initials[0] + "+";
  }

  return initials.join("");
};

export const getCalendarMinMaxDate = (minYear, maxYear) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - maxYear,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minYear,
    today.getMonth(),
    today.getDate()
  );
  return { minDate, maxDate };
};

export const getDesignationName = (allDesignations, designationId) => {
  return allDesignations?.byIds?.[designationId]?.name || "";
};

export const getDepartmentName = (allDepartments, departmentId) => {
  return allDepartments?.byIds?.[departmentId]?.name || "";
};

export const formatDate = (date) => date.toISOString().split("T")[0];

export const isValidPrivateChatRoom = (chatRoom, currentUserId) => {
  if (
    chatRoom?.isGroup !== false ||
    !Array.isArray(chatRoom?.participants) ||
    chatRoom.participants.length !== 2 ||
    !currentUserId
  ) {
    return false;
  }

  const userIds = chatRoom.participants.map((user) => user?.id);
  return (
    userIds.includes(currentUserId) &&
    userIds.some((id) => id !== currentUserId)
  );
};
