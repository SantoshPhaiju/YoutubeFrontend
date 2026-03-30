import {useMutation} from "@tanstack/react-query";
import {IUploadVideoArgs, uploadVideo} from "@/services/api/videos/video.service";
import {toast} from "sonner";
import axios from "axios";


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
