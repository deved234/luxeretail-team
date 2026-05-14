import axiosInstance from '../api/axiosInstance'
import { ENDPOINTS } from '../api/endpoints'

// جيب الـ wishlist بتاعة يوزر معين
export const getWishlist = async (userId) => {
    const response = await axiosInstance.get(ENDPOINTS.WISHLIST, {
        params: { userId },
    })
    return response.data
}

// ضيف منتج للـ wishlist
export const addToWishlist = async (userId, productId) => {
    const response = await axiosInstance.post(ENDPOINTS.WISHLIST, {
        userId,
        productId,
    })
    return response.data
}

// شيل منتج من الـ wishlist
export const removeFromWishlist = async (id) => {
    await axiosInstance.delete(ENDPOINTS.WISHLIST_ITEM(id))
}

// تحقق لو المنتج موجود في الـ wishlist
export const checkInWishlist = async (userId, productId) => {
    const response = await axiosInstance.get(ENDPOINTS.WISHLIST, {
        params: { userId, productId },
    })
    return response.data.length > 0 ? response.data[0] : null
}