"use client";

import { cn } from "@/lib/utils";
import { getSuggestions } from "@/services/api/search/searchClient.service";
import { useSearchMutation } from "@/services/mutations/searchMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { PiMicrophone, PiMicrophoneBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

// Add this type above the Search component
type Suggestion = {
  query: string;
  isHistory: boolean;
};

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

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const searchQuery = form.watch("searchQuery");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const [searchFocus, setSearchFocus] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Suggestion[]>([]);
  useEffect(() => {
    setActiveSuggestionIndex(-1);
  }, [searchSuggestions]);

  const fetchSuggestions = async (query: string) => {
    const suggestions = await getSuggestions(query);
    setSearchSuggestions(suggestions?.data);
    const something = "this is something here";
  };

  const isNavigating = useRef(false);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (
      activeSuggestionIndex >= 0 &&
      suggestionRefs.current[activeSuggestionIndex]
    ) {
      suggestionRefs.current[activeSuggestionIndex]?.scrollIntoView({
        block: "nearest", // only scrolls if item is out of view, doesn't jump if already visible
      });
    }
  }, [activeSuggestionIndex]);

  // useEffect(() => {
  //     if (searchQuery.length < 2) {
  //         setSearchSuggestions([]);
  //         return;
  //     }
  //
  //     const loadSuggestions = async () => {
  //         await fetchSuggestions(searchQuery);
  //     };
  //
  //     loadSuggestions();
  // }, [searchQuery]);

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setDebouncedQuery(searchQuery);
  //     }, 100);

  //     return () => clearTimeout(timer);
  //   }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNavigating.current) {
        isNavigating.current = false;
        return;
      }
      setDebouncedQuery(searchQuery);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.length < 1) {
      setSearchSuggestions([]);
      //   return;
    }

    const loadSuggestions = async () => {
      await fetchSuggestions(debouncedQuery);
    };

    loadSuggestions();
  }, [debouncedQuery]);

  const searchMutation = useSearchMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    inputRef.current?.blur(); // remove focus
    searchMutation.mutate(values.searchQuery, {
      onSuccess: (data) => {
        console.log("Search suggestion saved successfully:", data);
      },
      onError: (error) => {
        console.error("Error saving search suggestion:", error);
      },
    });

    router.push(`/results?search_query=${values.searchQuery}`);
    setSearchFocus(false);
  }

  return (
    <div className="h-10.5 w-full ">
      <Form {...form}>
        <form
          className="hidden sm:flex mx-auto justify-center items-center gap-2 h-full w-[80%] "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-end pr-8 items-center gap-0 h-full w-full ">
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem
                  className={cn(`h-full shadow-none`, {
                    "w-[calc(74%-36px)]": !searchFocus,
                    "w-[74%]": searchFocus,
                  })}
                >
                  <FormControl className="shadow-none">
                    <div className="relative w-full h-full">
                      {searchFocus && (
                        <FiSearch
                          className={`absolute ml-2 left-2.5 top-1/2 -translate-y-1/2 text-gray-800 text-xl`}
                        />
                      )}

                      <Input
                        {...field}
                        ref={inputRef}
                        autoFocus={false}
                        onKeyDown={(e) => {
                          if (!searchSuggestions.length) return;

                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            const nextIndex =
                              activeSuggestionIndex <
                              searchSuggestions.length - 1
                                ? activeSuggestionIndex + 1
                                : activeSuggestionIndex;
                            setActiveSuggestionIndex(nextIndex);
                            isNavigating.current = true;
                            form.setValue(
                              "searchQuery",
                              searchSuggestions[nextIndex].query,
                            );
                          }

                          if (e.key === "ArrowUp") {
                            e.preventDefault();
                            const nextIndex =
                              activeSuggestionIndex > 0
                                ? activeSuggestionIndex - 1
                                : -1;
                            setActiveSuggestionIndex(nextIndex);
                            isNavigating.current = true;
                            // -1 means no suggestion selected, so restore the original typed query
                            if (nextIndex === -1) {
                              form.setValue("searchQuery", debouncedQuery);
                            } else {
                              form.setValue(
                                "searchQuery",
                                searchSuggestions[nextIndex].query,
                              );
                            }
                          }

                          if (e.key === "Enter" && activeSuggestionIndex >= 0) {
                            e.preventDefault();
                            const selected =
                              searchSuggestions[activeSuggestionIndex];
                            form.setValue("searchQuery", selected.query);
                            setActiveSuggestionIndex(-1);
                            setSearchSuggestions([]);
                          }

                          if (e.key === "Escape") {
                            form.setValue("searchQuery", debouncedQuery); // restore original
                            setActiveSuggestionIndex(-1);
                            // setSearchSuggestions([]);
                          }
                        }}
                        placeholder="Search"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                        className={cn(
                          `px-4 h-full border border-gray-300 focus-visible:ring-transparent focus-visible:border-purple-800 z-50 rounded-l-full text-[14px] md:text-[16px] shadow-none focus:shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] focus-visible:shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]`,
                          {
                            "pl-13": searchFocus === true,
                          },
                        )}
                        autoComplete={"off"}
                      />
                      {searchFocus && searchSuggestions.length > 0 && (
                        <div
                          className={
                            "absolute top-10.5 left-0 bg-white p-2 rounded-xl h-auto max-h-[70vh] overflow-y-auto min-w-87.5 w-full z-9999 shadow-md no-scrollbar"
                          }
                        >
                          <ul className={"flex flex-col gap-2"}>
                            {searchSuggestions.map((item, index) => {
                              //   console.log("item", item);
                              return (
                                <li
                                  key={index}
                                  ref={(el) => {
                                    suggestionRefs.current[index] = el;
                                  }}
                                  onMouseEnter={() => setHoveredIndex(index)}
                                  onMouseLeave={() => setHoveredIndex(-1)}
                                  className={cn(
                                    "hover:bg-gray-100 w-full cursor-pointer px-2 py-2 rounded-lg flex justify-between items-center",
                                    {
                                      "bg-gray-100":
                                        activeSuggestionIndex === index ||
                                        hoveredIndex === index,
                                    },
                                  )}
                                  //   onMouseEnter={() =>
                                  //     setActiveSuggestionIndex(index)
                                  //   } // sync mouse + keyboard
                                  //   onMouseLeave={() =>
                                  //     setActiveSuggestionIndex(-1)
                                  //   }
                                >
                                  <div
                                    className={
                                      "flex justify-start items-center gap-4"
                                    }
                                  >
                                    <div>
                                      {item?.isHistory ? (
                                        <LuHistory
                                          className={"text-xl font-black"}
                                        />
                                      ) : (
                                        <FiSearch
                                          className={"text-xl font-black"}
                                        />
                                      )}
                                    </div>
                                    {/* <div>{item?.query}</div> */}
                                    <HighlightMatch
                                      text={item?.query}
                                      query={searchQuery}
                                    />
                                  </div>
                                  {item?.isHistory === true && (
                                    <div
                                      className={cn(`hidden`, {
                                        block:
                                          activeSuggestionIndex === index ||
                                          hoveredIndex === index,
                                      })}
                                    >
                                      <RxCross2 />
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="secondary"
              size="icon"
              className="border-r shadow-none h-full border-gray-300 pl-1 w-15 bg-gray-100 border-t border-b rounded-r-full px-4 md:px-8 cursor-pointer"
            >
              <IoSearch className="h-6! w-6!" />
            </Button>
            <div className="flex justify-center items-center h-full ml-4">
              <div className="h-10 w-10 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
                {/* <FaMicrophone /> */}
                {/* <CiMicrophoneOn /> */}
                {/* <FiMic size={22} /> */}
                {/* <RiMicLine size={22} /> */}
                <PiMicrophone size={24} className={"font-medium"} />
              </div>
            </div>
          </div>
        </form>
      </Form>

      {/* 📱 Mobile View */}
      <div className="flex justify-center items-center h-full gap-1 sm:hidden">
        <IoSearch className="h-8 w-8 text-gray-600" />

        <div className="h-9 w-9 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer">
          <PiMicrophoneBold />
        </div>
      </div>
    </div>
  );
};

export default Search;

// Add this helper component above the Search component
const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <span>{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <span>
      {before}
      <span className="font-semibold">{match}</span>
      {after}
    </span>
  );
};
