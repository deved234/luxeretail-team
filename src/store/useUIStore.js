import { create } from 'zustand'

export const useUIStore = create((set) => ({
    // ── State ────────────────────────────────────────
    isCartDrawerOpen: false,
    isSearchOpen: false,
    activeCategory: 'all',

    // ── Actions ──────────────────────────────────────
    openCartDrawer: () => set({ isCartDrawerOpen: true }),
    closeCartDrawer: () => set({ isCartDrawerOpen: false }),
    toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),

    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false }),

    setActiveCategory: (category) => set({ activeCategory: category }),
}))