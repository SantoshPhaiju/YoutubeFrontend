import React from 'react';
import {FaRegCircleUser} from "react-icons/fa6";
import {Button} from "@/components/ui/button";

const SigninModal = () => {
    return (
        <div>
            <Button variant={"outline"}
                    className={"rounded-full cursor-pointer font-normal text-[16px] px-2 py-2 text-blue-600 hover:text-blue-600 flex justify-center items-center gap-1.5"}>
                <FaRegCircleUser className={"h-5.75! w-5.75!"}/>
                Sign in
            </Button>
        </div>
    );
};

export default SigninModal;
