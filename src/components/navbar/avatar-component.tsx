"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React, {useEffect} from "react";
import Link from "next/link";
import {IconType} from "react-icons";
import useAuthStore from "@/store/authStore";
import {useLogoutUser} from "@/services/mutations/authMutation";
import {toast} from "sonner";
import {useUserDataQuery} from "@/services/queries/authQuery";
import {useRouter} from "next/navigation";

interface IAvatarComponentProps {
    menuItems: {
        icon: IconType;
        label: string;
    }[]
    openDropdown: boolean;
    setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarComponent = ({
                             menuItems,
                             openDropdown,
                             setOpenDropdown,
                         }: IAvatarComponentProps) => {
    const logoutUser = useLogoutUser();
    const logout = useAuthStore((state) => state.logout);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const { data: user, isLoading } = useUserDataQuery();
    const router = useRouter();

    return (
        <div>
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer h-8 w-8">
                        <AvatarImage src={isLoading ? `https://github.com/shadcn.png`: user?.data?.avatar} />
                        <AvatarFallback>{user?.data?.fullname || "CN"}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white h-auto max-h-[90vh] mr-8 mt-2 px-0 rounded-xl w-[290px] py-0 border border-gray-300 ">
                    <DropdownMenuLabel
                        className="sticky top-0 left-0 z-50 gap-3 w-full flex justify-start items-start px-4 py-3 pt-4 bg-white">
                        <div className="">
                            <Avatar>
                                <AvatarImage src={isLoading ? `https://github.com/shadcn.png`: user?.data?.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            <div className="text-[18px] font-roboto font-medium">
                                {user?.data?.fullname}
                            </div>
                            <div className="text-[14px] font-normal font-sans">
                                @{user?.data?.username}
                            </div>
                            <Link
                                href={`/${user?.data?.username}`}
                                onClick={() => setOpenDropdown(false)}
                                className="text-blue-600 hover:underline underline-offset-4 font-normal mt-1"
                            >
                                View your channel
                            </Link>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-300"/>
                    <div className="pb-2">
                        {menuItems.map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                className="text-md w-full py-3 px-5 flex justify-start items-center gap-3 cursor-pointer"
                                onClick={async () => {
                                    if (item.label === 'Sign out') {
                                        const logoutRes = await logoutUser.mutateAsync();
                                        if (logoutRes.success) {
                                            toast.success('Logged out successfully');
                                            logout();
                                            router.push('/');
                                            setIsLoggedIn(false);

                                        }
                                    }
                                }}
                            >
                                <div className="text-[18px]">
                                    <item.icon/>
                                </div>
                                <span>{item.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </div>
                    {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default AvatarComponent;
