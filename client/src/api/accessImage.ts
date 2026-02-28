import { api } from "./ApiConfig";
export const loadGalleryImages = async () => {
    try {
        const response = await api.get('/images');
        return response.data;
    } catch (error) {
        console.error('Error loading gallery images:', error);
        throw error;
    }
}