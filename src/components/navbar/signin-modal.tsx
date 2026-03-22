"use client";

import React, {useState} from "react";
import {FaRegCircleUser} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {FieldGroup} from "@/components/ui/field";
import FormInput from "@/components/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema, signupFormSchema} from "@/schemas/auth.schema";
import useAuthStore from "@/store/authStore";
import {useLoginUser, useRegisterUser} from "@/services/mutations/authMutation";
import {toast} from "sonner";
import {cn} from "@/lib/utils";
import ImageCropModal from "@/components/ImageCropModal";
import Image from "next/image";

const SigninModal = () => {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("login");
    const [cropImage, setCropImage] = useState<string | null>(null);
    const [cropOpen, setCropOpen] = useState(false);


    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
    const loginMutation = useLoginUser();
    const signupMutation = useRegisterUser();

    // Login form
    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        defaultValues: {
            usernameoremail: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema),
    });

    // Signup form
    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: null,
        },
        resolver: zodResolver(signupFormSchema),
    });

    const onLogin = async (values: z.infer<typeof loginFormSchema>) => {
        const payload = values;
        const data = await loginMutation.mutateAsync(payload);

        if (data.statusCode === 200) {
            setAccessToken(data.data.token);
            setRefreshToken(data.data.refreshToken);
            setIsLoggedIn(true);
            toast.success("Login successful");
            setOpen(false);
            // window.location.href = "/";
        } else {
            console.error("Login failed:", data.message);
        }

    };

    const onSignup = async (values: z.infer<typeof signupFormSchema>) => {
        if (values.password !== values.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("username", values.username);
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.avatar) {
            formData.append("avatar", values.avatar);
        }

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            const response = await signupMutation.mutateAsync(formData);
            if (response.statusCode === 201) {
                toast.success("Signup successful! Now you can login.");
                setTab("login")
            } else {
                toast.error("Signup failed" + response.message);
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    const avatar = signupForm.watch("avatar");

    const handleAvatarSelect = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setCropImage(imageUrl);
        setCropOpen(true);
    };

    const handleCropComplete = (blob: Blob) => {
        const file = new File([blob], "avatar.jpg", {
            type: "image/jpeg",
        });

        signupForm.setValue("avatar", file); // 🔥 inject into RHF
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-full cursor-pointer font-medium text-[16px] px-2 py-2 text-blue-700 hover:text-blue-600 flex justify-center items-center gap-1.5 "
            >
                <FaRegCircleUser className="h-5 w-5"/> <span>Sign in</span>
            </Button>

            <div className={""}>
                <Dialog open={open} onOpenChange={setOpen}>

                    <DialogContent
                        className="[&>button]:hidden border border-black overflow-y-auto max-h-[90vh]! no-scrollbar rounded-md w-[90%]">
                        <DialogHeader className="hidden">
                            <DialogTitle className="hidden"></DialogTitle>
                            <DialogDescription className="hidden">hello</DialogDescription>
                        </DialogHeader>

                        <Tabs value={tab} onValueChange={setTab} defaultValue="login" className="w-full">
                            <TabsList className="w-full gap-2 mb-4! hidden">
                                <TabsTrigger value="login" className="w-full cursor-pointer">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger value="signup" className="w-full cursor-pointer">
                                    Signup
                                </TabsTrigger>
                            </TabsList>

                            {/* Login Form */}
                            <TabsContent value="login">
                                <div className="mb-4 text-lg text-center font-inter font-semibold">
                                    Login to your account
                                </div>
                                <form id="form-login" onSubmit={loginForm.handleSubmit(onLogin)}>
                                    <FieldGroup className="gap-4">
                                        <FormInput
                                            control={loginForm.control}
                                            name="usernameoremail"
                                            label="Username/Email"
                                            placeholder="Enter your username or email"
                                            type="text"
                                            required
                                        />
                                        <FormInput
                                            control={loginForm.control}
                                            name="password"
                                            label="Password"
                                            placeholder="Password"
                                            type="password"
                                            required
                                        />
                                    </FieldGroup>
                                </form>
                                <div className="flex flex-col gap-2 font-inter mt-4">
                                    <div className="flex gap-2 w-full">
                                        <DialogClose className="w-full cursor-pointer text-sm">Cancel</DialogClose>
                                        <Button form="form-login" type="submit" className="cursor-pointer w-full">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 text-center mt-4">
                                    Need an account?{" "}
                                    <span
                                        onClick={() => setTab("signup")}
                                        className="text-black font-medium hover:underline hover:underline-offset-2 cursor-pointer"
                                    >
                              Sign up
                            </span>
                                </div>
                            </TabsContent>

                            {/* Signup Form */}
                            <TabsContent value="signup">
                                <div className="mb-4 text-lg text-center font-inter font-semibold">
                                    Create New Account
                                </div>
                                <form encType={"multipart/form-data"} id="form-signup"
                                      onSubmit={signupForm.handleSubmit(onSignup)}
                                      className="flex flex-col gap-4">
                                    <FieldGroup className="gap-4">
                                        {/* Username */}
                                        <FormInput
                                            placeholder="Enter your username"
                                            control={signupForm.control}
                                            name="username"
                                            label="Username"
                                            required
                                        />

                                        {/* Full Name */}
                                        <FormInput
                                            placeholder="Enter your full name"
                                            control={signupForm.control}
                                            name="fullname"
                                            label="Full Name"
                                            required
                                        />

                                        {/* Email */}
                                        <FormInput
                                            placeholder="Enter your email"
                                            control={signupForm.control}
                                            name="email"
                                            label="Email"
                                            type="email"
                                            required
                                        />

                                        {/* Password */}
                                        <FormInput
                                            placeholder="Enter your password"
                                            control={signupForm.control}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            required
                                        />

                                        {/* Confirm Password */}
                                        <FormInput
                                            placeholder="Confirm your password"
                                            control={signupForm.control}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            required
                                        />

                                        {/*<FormInput type={"file"} control={signupForm.control} name={"avatar"}*/}
                                        {/*           label={"Avatar Image"} required={true}*/}
                                        {/*/>*/}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleAvatarSelect(e)}
                                        />

                                        {avatar && (
                                            <Image
                                                src={URL.createObjectURL(avatar)}
                                                width={100}
                                                height={100}
                                                alt="Avatar"
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                        )}

                                    </FieldGroup>
                                </form>

                                <div className="flex flex-col gap-2 font-inter mt-4">
                                    <div className="flex gap-2 w-full">
                                        <DialogClose className="w-full cursor-pointer text-sm">Cancel</DialogClose>
                                        <Button disabled={signupMutation.isPending} form="form-signup" type="submit"
                                                className={cn(`cursor-pointer w-full`, {
                                                    "cursor-not-allowed": signupMutation.isPending,
                                                })}>
                                            {signupMutation.isPending ? "Loading..." : "Signup"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 text-center mt-4">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setTab("login")}
                                        className="text-black font-medium hover:underline hover:underline-offset-2 cursor-pointer"
                                    >
                                  Sign in
                                </span>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>

                </Dialog>
                {cropImage && (
                    <ImageCropModal
                        open={cropOpen}
                        setOpen={setCropOpen}
                        image={cropImage}
                        onCropComplete={handleCropComplete}
                    />
                )}
            </div>
        </div>
    );
};

export default SigninModal;
