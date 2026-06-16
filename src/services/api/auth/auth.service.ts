// here we will write the backend communication logic, means sending http request to the backend

import { IApiResponse } from "@/@types/api-response.type";
import api from "@/services/axios";

export const signIn = async (payload: {
  usernameoremail: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async ({
  formData,
}: {
  formData: FormData;
}): Promise<IApiResponse<any>> => {
  // for (const [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value} in formData`);
  // }
  try {
    const response = await api.post("/users/register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUserApi = async (): Promise<IApiResponse<null>> => {
  try {
    const response = await api.post("/users/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoggedInUserData = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
