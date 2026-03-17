// here we will write the backend communication logic, means sending http request to the backend

import api from "@/services/axios";
import {IVideo} from "@/@types/videos/videos.type";
import {AxiosResponse} from "axios";

export const getAllHomePageVideos = async ({}) => {
    try {
        const response = await api.get("/videos/get-home-page-videos");
        return response.data.data.videos;
    } catch (e) {
        console.error("error", e);
    }
}

type GetVideoParams = {
    id: string;
};

type GetVideoResponse = {
    data: {
        video: IVideo;
    };
};

export const getVideoById = async (
    { id }: GetVideoParams
): Promise<IVideo> => {
    try {
        const response: AxiosResponse<GetVideoResponse> =
            await api.get(`/videos/get-video/${id}`);
        return response.data.data.video;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};
