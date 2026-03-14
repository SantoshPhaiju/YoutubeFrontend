import {useMutation} from "@tanstack/react-query";
import {logout, signIn, signUp} from "@/services/api/auth/auth.service";
import axios from "axios";
import { toast } from "sonner";

export function useLoginUser() {
    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return signIn({email, password})
        },
        onError: (error) => {
            console.log(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

export function useRegisterUser() {
    return useMutation({
        mutationKey: ["registerUser"],
        mutationFn: async (formData: FormData) => {
            return signUp({ formData });
        },
        onError: (error) => {
            console.log(error);
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}

export function useLogoutUser() {
    return useMutation({
        mutationFn: async () => {
            return logout();
        },
        onError: (error) => {
            console.log(error)
            if(axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong")
            }
        }
    })
}
