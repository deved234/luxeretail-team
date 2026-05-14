import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkInWishlist,
} from '../services/wishlistService'

export function useWishlist() {
    const { user, isAuthenticated } = useAuthStore()
    const [wishlist, setWishlist] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // جيب الـ wishlist لما اليوزر يكون logged in
    useEffect(() => {
        if (!isAuthenticated || !user) return

        const fetch = async () => {
            try {
                setIsLoading(true)
                const data = await getWishlist(user.id)
                setWishlist(data)
            } catch {
                // silently fail
            } finally {
                setIsLoading(false)
            }
        }

        fetch()
    }, [isAuthenticated, user])

    // تحقق لو منتج في الـ wishlist
    const isWishlisted = (productId) =>
        wishlist.some((item) => item.productId === productId)

    // toggle — لو موجود اشيله، لو مش موجود ضيفه
    const toggleWishlist = async (productId, productName) => {
        if (!isAuthenticated) {
            toast.error('Please login to save items')
            return
        }

        const existing = await checkInWishlist(user.id, productId)

        if (existing) {
            await removeFromWishlist(existing.id)
            setWishlist((prev) => prev.filter((i) => i.productId !== productId))
            toast.success(`${productName} removed from wishlist`)
        } else {
            const newItem = await addToWishlist(user.id, productId)
            setWishlist((prev) => [...prev, newItem])
            toast.success(`${productName} saved to wishlist`)
        }
    }

    return {
        wishlist,
        isLoading,
        isWishlisted,
        toggleWishlist,
    }
}