export const APP_NAME = import.meta.env.VITE_APP_NAME || 'LuxeRetail'
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const ITEMS_PER_PAGE = 12
export const SEARCH_DEBOUNCE_MS = 350

export const ORDER_STATUS_COLORS = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-brand-light text-brand-primary',
    delivered: 'bg-brand-success-bg text-brand-success',
    cancelled: 'bg-red-100 text-red-600',
}

export const ORDER_STATUS_LABELS = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
}

export const SORT_OPTIONS = [
    { value: 'createdAt_desc', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Top Rated' },
]

export const LOCAL_STORAGE_KEYS = {
    AUTH: 'luxe-auth',
    CART: 'luxe-cart',
    THEME: 'luxe-theme',
}