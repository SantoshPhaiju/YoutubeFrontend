// here we will write the backend communication logic, means sending http request to the backend

import api from "@/services/axios";
import {IVideo} from "@/@types/videos/videos.type";
import axios, {AxiosResponse} from "axios";
import {cookies} from "next/headers";

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
    {id}: GetVideoParams
): Promise<IVideo> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        const response: AxiosResponse<GetVideoResponse> =
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/videos/get-video/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data.data.video;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};


export interface IUploadVideoArgs {
    formData: FormData;
    setUploadProgress: (progress: number) => void;
    setUploadPhase: (phase: "idle" | "uploading" | "processing" | "done") => void;
}

export const uploadVideo = async ({
                                      formData,
                                      setUploadProgress,
                                      setUploadPhase,
                                  }: IUploadVideoArgs) => {
    try {

        const response = await api.post("/videos/upload-video", formData, {
            headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    const capped = Math.min(Math.round(percent * 0.9), 90);
                    setUploadProgress(capped);

                    if (percent >= 100) {
                        setUploadPhase("processing");
                    }
                }
            },
        });
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}
