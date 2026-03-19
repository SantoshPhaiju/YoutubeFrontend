'use client';

import {useTheme} from "next-themes";
import {useEffect} from "react";

export default function NotFound() {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("light");
    }, []);
    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">404 - Channel Not Found</h1>
            <p className="text-gray-600 mt-2">
                The channel you are looking for does not exist.
            </p>
        </div>
    );
}
