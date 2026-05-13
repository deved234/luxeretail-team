import axios from 'axios'
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../constants/config'

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// ── Request Interceptor ──────────────────────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH)
            if (stored) {
                const { state } = JSON.parse(stored)
                if (state?.token) {
                    config.headers.Authorization = `Bearer ${state.token}`
                }
            }
        } catch {
            // ignore
        }
        return config
    },
    (error) => Promise.reject(error)
)

// ── Response Interceptor ─────────────────────────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH)
            window.location.href = '/login'
        }

        error.userMessage =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong'

        return Promise.reject(error)
    }
)

export default axiosInstance