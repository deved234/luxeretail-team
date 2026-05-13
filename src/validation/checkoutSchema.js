import { z } from 'zod'

export const checkoutSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Enter a valid email address'),
    phone: z
        .string()
        .min(1, 'Phone number is required'),
    street: z
        .string()
        .min(1, 'Street address is required'),
    city: z
        .string()
        .min(1, 'City is required'),
    state: z
        .string()
        .optional(),
    zip: z
        .string()
        .min(1, 'ZIP code is required'),
    country: z
        .string()
        .min(1, 'Country is required'),
    paymentMethod: z
        .enum(['COD', 'card'], {
            required_error: 'Please select a payment method',
        }),
})