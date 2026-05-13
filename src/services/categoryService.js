import axiosInstance from '../api/axiosInstance'
import { ENDPOINTS } from '../api/endpoints'

// جيب كل الـ categories
export const getCategories = async () => {
    const response = await axiosInstance.get(ENDPOINTS.CATEGORIES)
    return response.data
}