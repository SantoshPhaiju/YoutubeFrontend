import {z} from "zod";

export const loginFormSchema = z
    .object({
        usernameoremail: z.string().min(3),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

export const signupFormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    fullname: z.string().min(3, "Fullname must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    avatar: z.instanceof(File).nullable().optional(),
});
