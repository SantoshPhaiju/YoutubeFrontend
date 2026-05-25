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

export const saveSuggestion = async (query: string) => {
    try {
        const response = await api.post(`/search/suggestions/save?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}
