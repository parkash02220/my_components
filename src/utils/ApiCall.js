import axiosInstance from "./axiosInstance";

export async function ApiCall({
  url,
  method = "GET",
  body = null,
  headers = {},
  signal,
  onUploadProgress,
}) {
  const isFormData = body instanceof FormData;

  const config = {
    url,
    method,
    headers: isFormData ? headers : { "Content-Type": "application/json", ...headers },
    onUploadProgress: isFormData ? onUploadProgress : undefined,
    signal,
  };

  if (body !== null) {
    config.data = body;
  }


  try {
    const response = await axiosInstance(config);
    return { data: response.data };
  } catch (error) {
    if (error.name === "CanceledError") {
      return { aborted: true };
    }

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
