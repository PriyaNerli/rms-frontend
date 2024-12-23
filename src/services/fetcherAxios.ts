import { axiosInstanceFA } from "./axiosInstance";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"; // Add more methods if needed

export const fetcherAxiosFA = async (
  method: HttpMethod,
  url: string,
  body?: any,
  headers?: object
) => {
  try {
    const axiosResponse = await axiosInstanceFA({
      method,
      url,
      data: body,
      headers,
    });

    // Check if the response is successful
    if (axiosResponse.status === 200) {
      return axiosResponse.data;
    }
    // Return an error object with a message if the status is not 200
    return axiosResponse.data;
  } catch (error: any) {
    console.error("Error occurred while making an API request:", error);

    // Return an error object with details to be handled by the caller
    return (
      error?.response?.data || error?.message || "An unexpected error occurred"
    );
  }
};
