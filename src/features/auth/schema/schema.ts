import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
})

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirm_password: z.string(),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    role: z.enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Please select a valid role' }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export type LoginFormData = z.infer<typeof LoginSchema>
export type SignUpFormData = z.infer<typeof SignUpSchema>
