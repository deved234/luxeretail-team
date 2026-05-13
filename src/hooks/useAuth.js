import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { loginUser, registerUser } from '../services/authService'
import { ROUTES } from '../constants/routes'

export function useAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        loginSuccess,
        logout: logoutStore,
        setLoading,
        setError,
    } = useAuthStore()

    // ── Login ───────────────────────────────────────────
    const login = async (credentials) => {
        try {
            setLoading(true)
            const { user, token } = await loginUser(credentials)
            loginSuccess(user, token)
            toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)

            // رجّع اليوزر للصفحة اللي كان رايحلها قبل الـ login
            const from = location.state?.from?.pathname || ROUTES.HOME
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message)
            toast.error(err.message || 'Login failed')
        }
    }

    // ── Register ────────────────────────────────────────
    const register = async (data) => {
        try {
            setLoading(true)
            const { user, token } = await registerUser(data)
            loginSuccess(user, token)
            toast.success(`Welcome to LuxeRetail, ${user.name.split(' ')[0]}!`)
            navigate(ROUTES.HOME, { replace: true })
        } catch (err) {
            setError(err.message)
            toast.error(err.message || 'Registration failed')
        }
    }

    // ── Logout ──────────────────────────────────────────
    const logout = () => {
        logoutStore()
        toast.success('Logged out successfully')
        navigate(ROUTES.LOGIN, { replace: true })
    }

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
    }
}