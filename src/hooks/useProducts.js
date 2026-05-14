import { useEffect, useState } from 'react'
import { getProducts, getFeaturedProducts } from '../services/productService'

export function useProducts(params = {}) {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const fetch = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getProducts(params)
                if (!cancelled) setProducts(data)
            } catch (err) {
                if (!cancelled) setError(err.userMessage || 'Failed to load products')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetch()

        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(params)])

    return { products, isLoading, error }
}

export function useFeaturedProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const fetch = async () => {
            try {
                setIsLoading(true)
                const data = await getFeaturedProducts()
                if (!cancelled) setProducts(data)
            } catch (err) {
                if (!cancelled) setError(err.userMessage || 'Failed to load products')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetch()
        return () => { cancelled = true }
    }, [])

    return { products, isLoading, error }
}