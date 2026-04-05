// here we will write the backend communication logic, means sending http request to the backend

import {IVideo} from "@/@types/videos/videos.type";
import axios, {AxiosResponse} from "axios";
import {cookies} from "next/headers";
import {cache} from "react";

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

export const getVideoByIdCached = cache(async (id: string) => {
    return await getVideoById({id});
});



