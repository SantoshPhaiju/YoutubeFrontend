"use client";

import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useMutation} from "@tanstack/react-query";
import {Field, FieldError, FieldLabel, FieldGroup} from "@/components/ui/field";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {GoVideo} from "react-icons/go";
import {ImageIcon, UploadCloud, X} from "lucide-react";
import FormInput from "@/components/form";
import api from "@/services/axios";
import {toast} from "sonner";
import {uploadVideoSchema} from "@/schemas/uploadVideoSchema";
import {useRouter} from "next/navigation";


type UploadVideoFormValues = z.infer<typeof uploadVideoSchema>;

type UploadPhase = "idle" | "uploading" | "processing" | "done";

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface VideoUploaderProps {
    file: File | null;
    invalid: boolean;
    onChange: (file: File | null) => void;
}

function VideoUploader({file, invalid, onChange}: VideoUploaderProps) {
    const url = file ? URL.createObjectURL(file) : null;

    if (url && file) {
        return (
            <div className="relative w-full rounded-xl overflow-hidden border border-border bg-black group">
                <video
                    src={url}
                    controls
                    className="w-full aspect-video object-contain"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/80 border-t border-border">
                    <GoVideo size={15} className="text-muted-foreground shrink-0"/>
                    <span className="text-xs text-muted-foreground truncate flex-1">{file.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{formatFileSize(file.size)}</span>
                </div>
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Remove video"
                >
                    <X size={14}/>
                </button>
            </div>
        );
    }

    return (
        <label
            htmlFor="videoFile"
            className={`flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed cursor-pointer transition-all px-4 py-7 gap-3 ${
                invalid
                    ? "border-red-500 bg-red-50/20"
                    : "border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40"
            }`}
        >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${invalid ? "bg-red-100" : "bg-muted"}`}>
                <UploadCloud size={22} className={invalid ? "text-red-500" : "text-muted-foreground"}/>
            </div>
            <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">Click to upload a video</p>
                <p className="text-xs text-muted-foreground">MP4, MOV, AVI, MKV, WEBM</p>
                <p className="text-xs text-muted-foreground">Up to 2GB</p>
            </div>
            <input
                id="videoFile"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    onChange(f);
                    e.target.value = "";
                }}
            />
        </label>
    );
}

interface ThumbnailUploaderProps {
    file: File | null;
    invalid: boolean;
    onChange: (file: File | null) => void;
}

function ThumbnailUploader({file, invalid, onChange}: ThumbnailUploaderProps) {
    const url = file ? URL.createObjectURL(file) : null;

    if (url && file) {
        return (
            <div className="relative w-full rounded-xl overflow-hidden border border-border group">
                <img
                    src={url}
                    alt="Thumbnail preview"
                    className="w-full aspect-video object-cover"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/80 border-t border-border">
                    <ImageIcon size={14} className="text-muted-foreground shrink-0"/>
                    <span className="text-xs text-muted-foreground truncate flex-1">{file.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{formatFileSize(file.size)}</span>
                </div>
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Remove thumbnail"
                >
                    <X size={14}/>
                </button>
            </div>
        );
    }

    return (
        <label
            htmlFor="thumbnail"
            className={`flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed cursor-pointer transition-all px-4 py-7 gap-3 ${
                invalid
                    ? "border-red-500 bg-red-50/20"
                    : "border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40"
            }`}
        >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${invalid ? "bg-red-100" : "bg-muted"}`}>
                <UploadCloud size={22} className={invalid ? "text-red-500" : "text-muted-foreground"}/>
            </div>
            <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">Click to upload a thumbnail</p>
                <p className="text-xs text-muted-foreground">JPG, JPEG, PNG, WEBP</p>
                <p className="text-xs text-muted-foreground">Recommended: 1280 × 720px</p>
            </div>
            <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    onChange(f);
                    e.target.value = "";
                }}
            />
        </label>
    );
}

interface UploadVideoFormProps {
    onClose: () => void;
}

const UploadVideoForm = ({onClose}: UploadVideoFormProps) => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const router = useRouter();

    const form = useForm<UploadVideoFormValues>({
        resolver: zodResolver(uploadVideoSchema),
        defaultValues: {
            title: "",
            description: "",
            visibility: "public",
            videoFile: undefined,
            thumbnail: undefined,
        },
    });

    const resetState = () => {
        form.reset();
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadProgress(0);
        setUploadPhase("idle");
    };

    const uploadVideoMutation = useMutation({
        mutationFn: (formData: FormData) => {
            return api.post("/videos/upload-video", formData, {
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
        },
        onSuccess: () => {
            setUploadPhase("done");
            setUploadProgress(100);
            toast.success("Video uploaded successfully!", {
                description: "Your video is now being processed and will be available shortly.",
            });
            router.push("/");
            router.refresh();
            setTimeout(() => {
                resetState();
                onClose();
            }, 800);
        },
        onError: (error: any) => {
            setUploadPhase("idle");
            setUploadProgress(0);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong. Please try again.";
            toast.error("Upload failed", {
                description: message,
            });
        },
    });

    const isUploading = uploadVideoMutation.isPending;

    // ─── Submit ───────────────────────────────────────────────────────────────

    const onSubmit = (data: UploadVideoFormValues) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("visibility", data.visibility);
        formData.append("videoFile", data.videoFile);
        formData.append("thumbnail", data.thumbnail);

        setUploadProgress(0);
        setUploadPhase("uploading");
        uploadVideoMutation.mutate(formData);
    };

    // ─── Progress label ───────────────────────────────────────────────────────

    const progressLabel = {
        idle: "",
        uploading: `Uploading… ${uploadProgress}%`,
        processing: "Processing on server…",
        done: "Done!",
    }[uploadPhase];

    const progressStatus = {
        idle: "",
        uploading: `${uploadProgress}%`,
        processing: "Almost done",
        done: "100%",
    }[uploadPhase];

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-1">
            <FieldGroup className="gap-4">

                {/* Title */}
                <FormInput
                    control={form.control}
                    name="title"
                    label="Title"
                    placeholder="Enter a title for your video"
                    required
                />

                {/* Description */}
                <Controller
                    control={form.control}
                    name="description"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                                Description <span className="text-red-800">*</span>
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="description"
                                placeholder="Tell viewers about your video…"
                                rows={4}
                                className="resize-none min-h-24"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                {/* Video File */}
                <Controller
                    control={form.control}
                    name="videoFile"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="videoFile">
                                Video File <span className="text-red-800">*</span>
                            </FieldLabel>
                            <VideoUploader
                                file={videoFile}
                                invalid={fieldState.invalid}
                                onChange={(file) => {
                                    setVideoFile(file);
                                    field.onChange(file);
                                }}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                {/* Thumbnail */}
                <Controller
                    control={form.control}
                    name="thumbnail"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="thumbnail">
                                Thumbnail <span className="text-red-800">*</span>
                            </FieldLabel>
                            <ThumbnailUploader
                                file={thumbnailFile}
                                invalid={fieldState.invalid}
                                onChange={(file) => {
                                    setThumbnailFile(file);
                                    field.onChange(file);
                                }}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />

                {/* Visibility */}
                <Controller
                    control={form.control}
                    name="visibility"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="visibility">
                                Visibility <span className="text-red-800">*</span>
                            </FieldLabel>
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="visibility"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select visibility"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">🌍 Public</SelectItem>
                                    <SelectItem value="private">🔒 Private</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Upload Progress Bar */}
            {uploadPhase !== "idle" && (
                <div className="space-y-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">{progressLabel}</span>
                        <span className="text-muted-foreground tabular-nums">{progressStatus}</span>
                    </div>
                    <Progress
                        value={uploadPhase === "processing" ? undefined : uploadProgress}
                        // When processing, use indeterminate animation via CSS
                        className={`h-2 ${uploadPhase === "processing" ? "animate-pulse" : ""}`}
                    />
                    {uploadPhase === "processing" && (
                        <p className="text-xs text-muted-foreground">
                            The server is processing your video. Please wait…
                        </p>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        resetState();
                        onClose();
                    }}
                    disabled={isUploading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading…" : "Upload Video"}
                </Button>
            </div>
        </form>
    );
};

export default UploadVideoForm;
