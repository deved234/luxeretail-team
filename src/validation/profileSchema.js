import { z } from 'zod'

export const profileSchema = z.object({
    name: z
        .string()
        .min(1, 'Full name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Enter a valid email address'),
    phone: z
        .string()
        .optional(),
    street: z
        .string()
        .optional(),
    city: z
        .string()
        .optional(),
    state: z
        .string()
        .optional(),
    zip: z
        .string()
        .optional(),
    country: z
        .string()
        .optional(),
})