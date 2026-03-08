"use client";

import React, {useState, useCallback} from "react";
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
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {loginFormSchema, signupFormSchema} from "@/schemas/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import FormInput from "@/components/form";

const SigninModal = () => {
    const [open, setOpen] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [tab, setTab] = useState("login");

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

    // Login submit
    const onLogin = (values: z.infer<typeof loginFormSchema>) => {
        console.log("Login values:", values);
    };

    // Signup submit
    const onSignup = (values: z.infer<typeof signupFormSchema>) => {
        console.log("Signup values:", values);
    };

    // Handle avatar file drop
    const handleAvatarChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result as string);
                signupForm.setValue("avatar", reader.result as string); // set base64 in form
            };
            reader.readAsDataURL(file);
        },
        [signupForm]
    );

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-full cursor-pointer font-medium text-[16px] px-2 py-2 text-blue-700 hover:text-blue-600 flex justify-center items-center gap-1.5 "
            >
                <FaRegCircleUser className="h-5! w-5!"/>
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
                            <div className={"mb-4 text-lg text-center font-inter font-semibold "}>
                                Login to your account
                            </div>
                            <form id="form-login" onSubmit={loginForm.handleSubmit(onLogin)}>
                                <FieldGroup className="gap-4">
                                    <FormInput
                                        control={loginForm.control}
                                        name="email"
                                        label={"Email"}
                                        placeholder={"Enter your email"}
                                        type="email"
                                        required={true}
                                    />


                                    <Controller
                                        control={loginForm.control}
                                        name="password"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <Input
                                                    placeholder="Enter your password"
                                                    type="password"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </form>
                            <div className="flex flex-col! gap-2 font-inter mt-4">
                                <div className="flex gap-2 w-full">
                                    <DialogClose className="w-full cursor-pointer text-sm">
                                        Cancel
                                    </DialogClose>
                                    <Button form="form-login" type="submit" className="cursor-pointer w-full">
                                        Login
                                    </Button>
                                </div>
                            </div>
                            <div className={"text-sm text-gray-600 text-center mt-4"}>
                                Need an account? <span onClick={() => setTab("signup")}
                                                       className={"text-black font-medium hover:underline hover:underline-offset-2 cursor-pointer"}>
                                Sign up
                            </span>
                            </div>
                        </TabsContent>

                        {/* Signup Form */}
                        <TabsContent value="signup">
                            <div className={"mb-4 text-lg text-center font-inter font-semibold "}>
                                Create New Account
                            </div>
                            <form
                                id="form-signup"
                                onSubmit={signupForm.handleSubmit(onSignup)}
                                className="flex flex-col gap-4"
                            >
                                <FieldGroup className="gap-4">
                                    {/* Username */}
                                    <Controller
                                        control={signupForm.control}
                                        name="username"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className={"flex gap-0"}>Username<span
                                                    className={"text-red-700"}>*</span></FieldLabel>
                                                <Input
                                                    placeholder="Enter your username"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />

                                    {/* Full Name */}
                                    <Controller
                                        control={signupForm.control}
                                        name="fullname"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                                <Input
                                                    placeholder="Enter your full name"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />

                                    {/* Email */}
                                    <Controller
                                        control={signupForm.control}
                                        name="email"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                                <Input
                                                    placeholder="Enter your email"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />

                                    {/* Password */}
                                    <Controller
                                        control={signupForm.control}
                                        name="password"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <Input
                                                    placeholder="Enter your password"
                                                    type="password"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />

                                    {/* Confirm Password */}
                                    <Controller
                                        control={signupForm.control}
                                        name="confirmPassword"
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                                <Input
                                                    placeholder="Confirm your password"
                                                    type="password"
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                            </Field>
                                        )}
                                    />

                                    {/* Avatar Upload with Drag & Drop */}
                                    <Field>
                                        <FieldLabel>Avatar</FieldLabel>
                                        <Controller
                                            control={signupForm.control}
                                            name="avatar"
                                            render={({field}) => (
                                                <div
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        const file = e.dataTransfer.files[0];
                                                        if (!file) return;
                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            setAvatarPreview(reader.result as string);
                                                            field.onChange(reader.result as string); // update form value
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }}
                                                    onClick={() => document.getElementById("avatarInput")?.click()}
                                                    className="border border-dashed border-gray-400 p-4 rounded cursor-pointer flex flex-col items-center justify-center hover:bg-gray-50"
                                                >
                                                    {avatarPreview ? (
                                                        <img
                                                            src={avatarPreview}
                                                            alt="Avatar Preview"
                                                            className="h-24 w-24 object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <span>Drag & drop or click to upload</span>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="avatarInput"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                setAvatarPreview(reader.result as string);
                                                                field.onChange(reader.result as string);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Field>
                                </FieldGroup>
                            </form>

                            <div className="flex flex-col! gap-2 font-inter mt-4">
                                <div className="flex gap-2 w-full">
                                    <DialogClose className="w-full cursor-pointer text-sm">
                                        Cancel
                                    </DialogClose>
                                    <Button form="form-signup" type="submit" className="cursor-pointer w-full">
                                        Signup
                                    </Button>
                                </div>
                            </div>
                            <div className={"text-sm text-gray-600 text-center mt-4"}>
                                Already have an account? <span onClick={() => setTab("login")}
                                                               className={"text-black font-medium hover:underline hover:underline-offset-2 cursor-pointer"}>
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
