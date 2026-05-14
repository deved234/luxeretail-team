export const ENDPOINTS = {
    PRODUCTS: '/products',
    PRODUCT: (id) => `/products/${id}`,

    CATEGORIES: '/categories',

    USERS: '/users',
    USER: (id) => `/users/${id}`,

    ORDERS: '/orders',
    ORDER: (id) => `/orders/${id}`,

    WISHLIST: '/wishlist',
    WISHLIST_ITEM: (id) => `/wishlist/${id}`,

    CART_ITEMS: '/cartItems',
    CART_ITEM: (id) => `/cartItems/${id}`,

    REVIEWS: '/reviews',
}