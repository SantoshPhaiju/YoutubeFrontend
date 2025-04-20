"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaMicrophone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="h-[42px]">
      <Form {...form}>
        <form
          className="hidden sm:flex justify-center items-center gap-2 h-full w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-center items-center gap-0 h-full w-[84%] sm:w-[80%] md:w-[88%]">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search"
                      className="px-4 focus-visible:right-0 h-full border border-gray-300 focus-visible:ring-transparent focus-visible:border-black rounded-l-full text-[16px] md:text-[18px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              size="icon"
              className="border-r h-full border-gray-300 pl-2 w-[60px] bg-white border-t border-b rounded-r-full"
            >
              <IoSearch className="h-[50px] w-[50px]" />
            </Button>
          </div>
          <div className="w-[14%] sm:w-[18%] md:w-[14%] flex justify-center items-center h-full">
            <div className="h-10 w-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
              <FaMicrophone />
            </div>
          </div>
        </form>
      </Form>

      <div className="flex justify-center items-center h-full sm:hidden">
        <IoSearch className="h-[24px] w-[24px] text-gray-600" />
      </div>
    </div>
  );
};

export default Search;
