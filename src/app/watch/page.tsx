import Videopage from "@/components/videopage";

interface WatchPageProps {
  searchParams: {
    v?: string; // Query parameter (optional because it might be missing)
  };
}

const Page = async ({ searchParams }: WatchPageProps) => {
  const videoId = (await searchParams).v;

  if (!videoId) {
    return <p>Invalid video ID</p>;
  }

  console.log(`Loading video: ${videoId}`);

  return (
    <div className="px-[64px] py-2">
      <Videopage />
    </div>
  );
};

export default Page;
