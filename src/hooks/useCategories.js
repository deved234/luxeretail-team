import { useEffect, useState } from 'react'
import { getCategories } from '../services/categoryService'

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const fetch = async () => {
            try {
                setIsLoading(true)
                const data = await getCategories()
                if (!cancelled) setCategories(data)
            } catch (err) {
                if (!cancelled) setError(err.userMessage || 'Failed to load categories')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetch()
        return () => { cancelled = true }
    }, [])

    return { categories, isLoading, error }
}