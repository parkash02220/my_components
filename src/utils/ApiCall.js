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
    signal,
  };

  if (body !== null) {
    config.data = body;
  }

  try {
    const response = await axiosInstance(config);
    return { data: response.data };
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const data = error.response?.data;

    return {
      error: {
        status,
        message,
        data,
      },
    };
  }
}
