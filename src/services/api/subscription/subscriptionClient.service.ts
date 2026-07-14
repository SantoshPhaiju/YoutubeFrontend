import api from "@/services/axios";

export const fetchSubscriptions = async () => {
  try {
    const response = await api.get("/subscriptions/get-subscribed-channels");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
