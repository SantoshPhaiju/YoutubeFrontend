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
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema, signupFormSchema} from "@/schemas/auth.schema";
import useAuthStore from "@/store/authStore";
import {useLoginUser} from "@/services/mutations/authMutation";
import {toast} from "sonner";
import {shallow} from "zustand/vanilla/shallow";

const SigninModal = () => {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("login");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
    const loginMutation = useLoginUser();

    // Login form
    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        defaultValues: {email: "", password: ""},
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
            avatar: "",
        },
        resolver: zodResolver(signupFormSchema),
    });

    const onLogin = async (values: z.infer<typeof loginFormSchema>) => {

        // console.log("Login values:", values);
            const {email, password} = values;
            const data = await loginMutation.mutateAsync({email, password});
            console.log("Login response:", data);
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

    const onSignup = (values: z.infer<typeof signupFormSchema>) => {
        console.log("Hello world");
        console.log("Signup values:", values);
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-full cursor-pointer font-medium text-[16px] px-2 py-2 text-blue-700 hover:text-blue-600 flex justify-center items-center gap-1.5 "
            >
                <FaRegCircleUser className="h-5 w-5"/>
                Sign in
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="[&>button]:hidden border border-black overflow-y-auto max-h-[90vh]! no-scrollbar">
                    <DialogHeader className="hidden">
                        <DialogTitle className="hidden"></DialogTitle>
                        <DialogDescription className="hidden">hello</DialogDescription>
                    </DialogHeader>

                    <Tabs value={tab} onValueChange={setTab} defaultValue="login" className="w-full">
                        <TabsList className="w-full flex gap-2 mb-4! hidden">
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
                                        name="email"
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
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
                            <form id="form-signup" onSubmit={signupForm.handleSubmit(onSignup)}
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

                                    {/* Avatar Upload */}
                                    {/*            <div*/}
                                    {/*                onDragOver={(e) => e.preventDefault()}*/}
                                    {/*                onDrop={(e) => {*/}
                                    {/*                    e.preventDefault();*/}
                                    {/*                    const droppedFile = e.dataTransfer.files[0];*/}
                                    {/*                    if (droppedFile) {*/}
                                    {/*                        setAvatarPreview(URL.createObjectURL(droppedFile)); // local preview*/}
                                    {/*                    }*/}
                                    {/*                }}*/}
                                    {/*                onClick={() => document.getElementById("avatar")?.click()}*/}
                                    {/*                className="border border-dashed border-gray-400 p-4 rounded cursor-pointer flex flex-col items-center justify-center hover:bg-gray-50"*/}
                                    {/*            >*/}
                                    {/*                {avatarPreview ? (*/}
                                    {/*                    <div className="relative">*/}
                                    {/*                        <img*/}
                                    {/*                            src={avatarPreview}*/}
                                    {/*                            alt="Avatar Preview"*/}
                                    {/*                            className="h-24 w-24 object-cover rounded-full"*/}
                                    {/*                        />*/}
                                    {/*                        <div*/}
                                    {/*                            onClick={(e) => {*/}
                                    {/*                                e.stopPropagation();*/}
                                    {/*                                field.onChange(null); // clear RHF value*/}
                                    {/*                                setAvatarPreview(null);*/}
                                    {/*                            }}*/}
                                    {/*                            className="absolute top-1 right-1 bg-black text-white rounded-full cursor-pointer"*/}
                                    {/*                        >*/}
                                    {/*                            <IoIosCloseCircleOutline className="text-xl"/>*/}
                                    {/*                        </div>*/}
                                    {/*                    </div>*/}
                                    {/*                ) : (*/}
                                    {/*                    <div*/}
                                    {/*                        className="flex justify-center items-center flex-col gap-4 w-full">*/}
                                    {/*                        <BsUpload className="text-4xl text-gray-700"/>*/}
                                    {/*                        <span>Drag & drop or click to upload</span>*/}
                                    {/*                    </div>*/}
                                    {/*                )}*/}
                                    {/*            </div>*/}
                                    <FormInput type={"file"} control={signupForm.control} name={"avatar"}
                                               label={"Avatar Image"} required={true}/>

                                </FieldGroup>
                            </form>

                            <div className="flex flex-col gap-2 font-inter mt-4">
                                <div className="flex gap-2 w-full">
                                    <DialogClose className="w-full cursor-pointer text-sm">Cancel</DialogClose>
                                    <Button form="form-signup" type="submit" className="cursor-pointer w-full">
                                        Signup
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
        </div>
    );
};

export default SigninModal;
