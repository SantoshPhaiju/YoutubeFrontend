"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaMicrophone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import {FiSearch} from "react-icons/fi";
import {cn} from "@/lib/utils";

const formSchema = z.object({
    searchQuery: z.string().min(2).max(50),
});

const Search = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: "",
        },
    });

    const [searchFocus, setSearchFocus] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="h-[42px] w-full ">
            <Form {...form}>
                <form
                    className="hidden sm:flex justify-center items-center gap-2 h-full w-full pr-0 sm:pr-8 md:pr-16 xl:pr-24 2xl:pr-32"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-end items-center gap-0  h-full w-full">

                        <FormField
                            control={form.control}
                            name="searchQuery"
                            render={({ field }) => (
                                <FormItem className={cn(`h-full`, {
                                    'w-[calc(80%-36px)]': !searchFocus,
                                    'w-[80%]': searchFocus
                                })}>
                                    <FormControl>
                                        <div className="relative w-full h-full">

                                            {/* 🔍 Search Icon inside input */}
                                            {searchFocus && <FiSearch
                                                className={`absolute ml-1 left-2.5 top-1/2 -translate-y-1/2 text-gray-800 text-xl`}
                                            />}

                                            <Input
                                                {...field}
                                                placeholder="Search"
                                                onFocus={() => setSearchFocus(true)}
                                                onBlur={() => setSearchFocus(false)}
                                                className={cn(`px-4 h-full border border-gray-300 focus-visible:ring-transparent focus-visible:border-black rounded-l-full text-[16px] md:text-[18px]`, {
                                                    'pl-[52px]': searchFocus === true
                                                })}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* 🔍 Submit Button */}
                        <Button
                            type="submit"
                            variant="secondary"
                            size="icon"
                            className="border-r h-full border-gray-300 pl-1 w-[60px] bg-gray-100 border-t border-b rounded-r-full px-4 md:px-8 cursor-pointer"
                        >
                            <IoSearch className="h-[24px]! w-[24px]!" />
                        </Button>
                    </div>

                    {/* 🎤 Mic Button */}
                    <div className="flex justify-center items-center h-full">
                        <div className="h-10 w-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
                            <FaMicrophone />
                        </div>
                    </div>
                </form>
            </Form>

            {/* 📱 Mobile View */}
            <div className="flex justify-center items-center h-full gap-1 sm:hidden">
                <IoSearch className="h-[32px] w-[32px] text-gray-600" />

                <div className="h-9 w-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
                    <FaMicrophone />
                </div>
            </div>
        </div>
    );
};

export default Search;
