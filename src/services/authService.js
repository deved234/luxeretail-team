import axiosInstance from '../api/axiosInstance'
import { ENDPOINTS } from '../api/endpoints'

// ── Login ─────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
    // جيب اليوزر بالـ email بس الأول
    const response = await axiosInstance.get(ENDPOINTS.USERS, {
        params: { email },
    })

    const users = response.data

    // لو مفيش يوزر بالـ email ده
    if (users.length === 0) {
        throw new Error('Invalid email or password')
    }

    const user = users[0]

    // قارن الـ password يدوياً
    if (user.password !== password) {
        throw new Error('Invalid email or password')
    }

    // مش هنرجع الـ password في الـ user object
    const { password: _, ...safeUser } = user

    // عمل fake token
    const token = btoa(`${user.id}:${Date.now()}`)

    return { user: safeUser, token }
}

// ── Register ──────────────────────────────────────────
export const registerUser = async ({ name, email, password }) => {
    // تأكد إن الـ email مش موجود
    const checkResponse = await axiosInstance.get(ENDPOINTS.USERS, {
        params: { email },
    })

    if (checkResponse.data.length > 0) {
        throw new Error('Email already in use')
    }

    // عمل اليوزر الجديد
    const newUser = {
        name,
        email,
        password,
        avatar: null,
        address: null,
        createdAt: new Date().toISOString(),
    }

    const response = await axiosInstance.post(ENDPOINTS.USERS, newUser)
    const user = response.data

    // مش هنرجع الـ password
    const { password: _, ...safeUser } = user

    const token = btoa(`${user.id}:${Date.now()}`)

    return { user: safeUser, token }
}

// ── Update Profile ────────────────────────────────────
export const updateProfile = async (id, data) => {
    const response = await axiosInstance.patch(ENDPOINTS.USER(id), data)
    return response.data
}