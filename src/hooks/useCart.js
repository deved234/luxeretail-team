import { useCartStore } from '../store/useCartStore'
import { toast } from 'react-hot-toast'

export function useCart() {
    const {
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
    } = useCartStore()

    const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const shippingFee = totalPrice >= 150 ? 0 : 5
    const tax = +(totalPrice * 0.075).toFixed(2)
    const grandTotal = +(totalPrice + shippingFee + tax).toFixed(2)

    const handleAddItem = (product, qty = 1, variant = '') => {
        addItem(product, qty, variant)
        toast.success(`${product.name} added to cart`)
    }

    const handleRemoveItem = (id, variant = '', name = '') => {
        removeItem(id, variant)
        toast.success(`${name} removed from cart`)
    }

    const isInCart = (id) => items.some((i) => i.id === id)

    return {
        items,
        totalItems,
        totalPrice,
        shippingFee,
        tax,
        grandTotal,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        updateQty,
        clearCart,
        isInCart,
    }
}