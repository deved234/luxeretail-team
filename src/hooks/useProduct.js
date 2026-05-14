import { useEffect, useState } from 'react'
import { getProductById } from '../services/productService'

export function useProduct(id) {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        let cancelled = false

        const fetch = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getProductById(id)
                if (!cancelled) setProduct(data)
            } catch (err) {
                if (!cancelled) setError(err.userMessage || 'Product not found')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetch()
        return () => { cancelled = true }
    }, [id])

    return { product, isLoading, error }
}