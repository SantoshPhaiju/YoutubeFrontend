import {z} from "zod";

export const uploadVideoSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters.")
        .max(100, "Title must be at most 100 characters."),
    description: z
        .string()
        .max(5000, "Description must be at most 5000 characters."),
    visibility: z.enum(["public", "private"], {
        required_error: "Please select a visibility option.",
    }),
    videoFile: z
        .any()
        .refine((file) => file instanceof File, "Please upload a video file.")
        .refine(
            (file) => file instanceof File && file.type.startsWith("video/"),
            "File must be a video."
        ),
    thumbnail: z
        .any()
        .refine((file) => file instanceof File, "Please upload a thumbnail image.")
        .refine(
            (file) => file instanceof File && file.type.startsWith("image/"),
            "File must be an image."
        ),
});
