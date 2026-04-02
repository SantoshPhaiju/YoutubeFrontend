import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import axios from "axios";
import {IUploadVideoArgs, trackVideoView, uploadVideo} from "@/services/api/videos/videoClient.service";


const uploadVideoMutationKey = "UploadVideo";

export function useUploadVideoMutation() {
    return useMutation({
        mutationKey: [uploadVideoMutationKey],
        mutationFn: async ({
                               formData,
                               setUploadProgress,
                               setUploadPhase,
                           }: IUploadVideoArgs) => await uploadVideo({
            formData,
            setUploadProgress,
            setUploadPhase,
        }),
        onError: (error) => {
            console.error(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

export function useTrackVideoViewMutation() {
    return useMutation({
        mutationKey: ["trackVideoView"],
        mutationFn: async (videoId: string) => {
            return await trackVideoView(videoId);
        },
        onError: (error) => {
            console.error(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}
