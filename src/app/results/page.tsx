import ClientResultsPage from "@/components/resultsPage/client-result-page";
import ResultItem from "@/components/resultsPage/result-item";
import SemiNavBadge from "@/components/semi-nav-badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getSearchResults } from "@/services/api/search/search.service";
import { VscSettings } from "react-icons/vsc";

interface ResultsPageProps {
  searchParams: {
    search_query?: string;
  };
}

const Page = async ({ searchParams }: ResultsPageProps) => {
  const searchQuery = (await searchParams).search_query;

  const searchResults = await getSearchResults(searchQuery || "");

  if (searchResults?.success === false) {
    return <p>Error fetching search results: {searchResults?.message}</p>;
  }

  if (searchResults?.data?.results?.length === 0) {
    return (
      <div className="h-[80vh] text-red-700 w-full justify-center items-center flex text-lg flex-col gap-2">
        <p>No results found for: {searchQuery}</p>
        <p>Try Searching for something else.</p>
      </div>
    );
  }

  const resultData = searchResults?.data?.results || [];

  const categories = [
    { name: "All", link: "/", selected: true },
    { name: "Shorts", link: "/music", selected: false },
    { name: "Unwatched", link: "/gaming", selected: false },
    { name: "Watched", link: "/news", selected: false },
    { name: "Videos", link: "/sports", selected: false },
    { name: "Recently uploaded", link: "/sports", selected: false },
    { name: "Live", link: "/sports", selected: false },
  ];

  return (
    <ClientResultsPage>
      <div className="px-2 md:px-4 lg:px-6 pb-2 -mt-4 z-0">
        {/* <p>Search results for: {searchQuery}</p> */}
        <div className="filterOptions flex justify-between items-center gap-2">
          <ScrollArea>
            <div className="flex gap-4">
              {categories.map((badge, index) => {
                return (
                  <div key={index}>
                    <SemiNavBadge
                      badgeName={badge.name}
                      badgeLink={badge.link}
                      selected={badge.selected || false}
                    />
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
          <div className="flex gap-2 items-center font-medium text-[15px] cursor-pointer">
            <div>Filters</div>
            <div>
              <VscSettings size={22} />
            </div>
          </div>
        </div>
        <div className="searchResults mt-4 py-2 w-full flex flex-col gap-4">
          {resultData?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <ResultItem key={index} resultData={item} />
              </div>
            );
          })}
        </div>
      </div>
    </ClientResultsPage>
  );
};

export default Page;
