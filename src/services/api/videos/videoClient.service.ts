import api from "@/services/axios";

export const getAllHomePageVideos = async ({}) => {
    try {
        const response = await api.get("/videos/get-home-page-videos");
        return response.data.data.videos;
    } catch (e) {
        console.error("error", e);
        throw e;
    }
}

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

export const trackVideoView = async (videoId: string)  => {
    try {
        const response = await api.patch(`/videos/track-views/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}

