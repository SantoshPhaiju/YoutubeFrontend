import axios from "axios";

export const getSearchResults = async (query: string) => {
  try {
    const url = `/search?q=${query}`;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
