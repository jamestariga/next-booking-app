import { z } from 'zod'

export const DisplayNameSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
})

export const UserSchema = z
  .object({
    email: z.string().email('Invalid email'),
    display_name: DisplayNameSchema,
  })
  .and(DisplayNameSchema)

export type UserFormData = z.infer<typeof UserSchema>
export type DisplayNameFields = z.infer<typeof DisplayNameSchema>
