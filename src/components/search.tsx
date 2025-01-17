'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoSearch } from "react-icons/io5";

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
    <>
      <Form {...form}>
        <form className="flex justify-center items-center gap-0" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search" className="px-4 rounded-l-full text-[22px] w-[400px]" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="ghost" size="icon" className="border-r pl-2 w-[60px] border-t border-b rounded-r-full">    
            <IoSearch />
          </Button>
        </form>
      </Form>
    </>
  );
}

export default Search
