import axiosInstance from '../api/axiosInstance'
import { ENDPOINTS } from '../api/endpoints'

// عمل أوردر جديد
export const createOrder = async (orderData) => {
    const response = await axiosInstance.post(ENDPOINTS.ORDERS, orderData)
    return response.data
}

// جيب كل أوردرات يوزر معين
export const getOrdersByUser = async (userId) => {
    const response = await axiosInstance.get(ENDPOINTS.ORDERS, {
        params: { userId },
    })
    return response.data
}

// جيب أوردر واحد بالـ id
export const getOrderById = async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.ORDER(id))
    return response.data
}