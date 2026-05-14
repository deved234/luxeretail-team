import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LOCAL_STORAGE_KEYS } from '../constants/config'

export const useCartStore = create(
    persist(
        (set, get) => ({
            // ── State ──────────────────────────────────────
            items: [],

            // ── Computed (derived from items) ───────────────
            get totalItems() {
                return get().items.reduce((sum, item) => sum + item.qty, 0)
            },
            get totalPrice() {
                return get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
            },

            // ── Actions ────────────────────────────────────
            addItem: (product, qty = 1, variant = '') => {
                const { items } = get()
                const existing = items.find(
                    (i) => i.id === product.id && i.variant === variant
                )

                if (existing) {
                    // لو موجود بالفعل زود الـ qty
                    set({
                        items: items.map((i) =>
                            i.id === product.id && i.variant === variant
                                ? { ...i, qty: i.qty + qty }
                                : i
                        ),
                    })
                } else {
                    // لو جديد ضيفه
                    set({
                        items: [
                            ...items,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                variant,
                                qty,
                            },
                        ],
                    })
                }
            },

            removeItem: (id, variant = '') => {
                set({
                    items: get().items.filter(
                        (i) => !(i.id === id && i.variant === variant)
                    ),
                })
            },

            updateQty: (id, variant = '', qty) => {
                if (qty < 1) return
                set({
                    items: get().items.map((i) =>
                        i.id === id && i.variant === variant ? { ...i, qty } : i
                    ),
                })
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: LOCAL_STORAGE_KEYS.CART,
        }
    )
)