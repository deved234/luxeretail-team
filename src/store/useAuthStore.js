import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LOCAL_STORAGE_KEYS } from '../constants/config'

export const useAuthStore = create(
    persist(
        (set) => ({
            // ── State ──────────────────────────────────────
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // ── Actions ────────────────────────────────────
            setLoading: (isLoading) => set({ isLoading }),

            loginSuccess: (user, token) => set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            }),

            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            }),

            setError: (error) => set({ error, isLoading: false }),

            updateUser: (updatedUser) => set((state) => ({
                user: { ...state.user, ...updatedUser },
            })),
        }),
        {
            name: LOCAL_STORAGE_KEYS.AUTH,
            // بيحفظ بس الـ user والـ token في localStorage
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)