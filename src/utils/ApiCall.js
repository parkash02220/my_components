import axiosInstance from "./axiosInstance";

export async function ApiCall({
  url,
  method = "GET",
  body = null,
  headers = {},
  signal,
}) {
  const config = {
    url,
    method,
    headers,
    data: body,
    signal,
  };

  try {
    const response = await axiosInstance(config);
    return { data: response.data };
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    const data = error.response?.data || null;

    return {
      error: {
        status,
        message,
        data,
      },
    };
  }
}
