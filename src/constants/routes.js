export const ROUTES = {
    HOME: '/',
    SHOP: '/shop',
    PRODUCT: '/shop/:productId',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDER_SUCCESS: '/order-success/:orderId',
    ORDERS: '/orders',
    PROFILE: '/profile',
    WISHLIST: '/wishlist',
    LOGIN: '/login',
    REGISTER: '/register',
    NOT_FOUND: '*',
}

// helper functions عشان تبني الـ dynamic paths
export const productPath = (id) => `/shop/${id}`
export const orderSuccessPath = (id) => `/order-success/${id}`