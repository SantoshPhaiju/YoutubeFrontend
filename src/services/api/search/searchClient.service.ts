import api from "@/services/axios";


export const getSuggestions = async (query: string) => {
    try {
        const response = await api.get(`/search/suggestions?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}
