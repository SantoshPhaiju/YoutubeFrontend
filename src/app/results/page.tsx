import ResultItem from "@/components/resultsPage/result-item";
import { getSearchResults } from "@/services/api/search/search.service";

interface ResultsPageProps {
  searchParams: {
    search_query?: string;
  };
}

const Page = async ({ searchParams }: ResultsPageProps) => {
  const searchQuery = (await searchParams).search_query;

  const searchResults = await getSearchResults(searchQuery || "");
  console.log("searchResults", searchResults);

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

  return (
    <div className="px-2 mt-4 md:px-4 lg:px-6 pb-2 -mt-4 z-0">
      <p>Search results for: {searchQuery}</p>
      <div className="filterOptions">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
        <div></div>

        <div className="searchResults py-2 w-full flex flex-col gap-4">
          {resultData?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <ResultItem key={index} resultData={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
