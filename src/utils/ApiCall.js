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
if(isFormData){
  for (let pair of body.entries()) {
    console.log("config key:", pair[0]);
    console.log("config value:", pair[1]);
  }

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
