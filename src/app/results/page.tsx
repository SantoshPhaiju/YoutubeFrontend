interface ResultsPageProps {
  searchParams: {
    search_query?: string;
  };
}

const Page = async ({ searchParams }: ResultsPageProps) => {
  const searchQuery = (await searchParams).search_query;
  return (
    <div>
      {searchQuery ? (
        <p>Search results for: {searchQuery}</p>
      ) : (
        <p>No search query provided.</p>
      )}
    </div>
  );
};

export default Page;
