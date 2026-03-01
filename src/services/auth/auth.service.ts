// here we will write the backend communication logic, means sending http request to the backend

import api from "@/services/axios";

export const getAllHomePageVideos = async ({}) => {
    try {
        const response = await api.get("/videos/get-home-page-videos");
        return response.data.data.videos;
    } catch (e) {
        console.log("error", e);
    }
}
