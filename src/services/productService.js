import axiosInstance from '../api/axiosInstance'
import { ENDPOINTS } from '../api/endpoints'

// جيب كل المنتجات مع فلترة واختياري
export const getProducts = async (params = {}) => {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCTS, { params })
    return response.data
}

// جيب منتج واحد بالـ id
export const getProductById = async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCT(id))
    return response.data
}

// جيب المنتجات الـ featured بس
export const getFeaturedProducts = async () => {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCTS, {
        params: { isFeatured: true },
    })
    return response.data
}

// سيرش في المنتجات
export const searchProducts = async (query) => {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCTS, {
        params: { q: query },
    })
    return response.data
}

// جيب منتجات بـ category معين
export const getProductsByCategory = async (categoryId) => {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCTS, {
        params: { categoryId },
    })
    return response.data
}