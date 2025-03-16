import { z } from 'zod'

export const serviceSchema = z.object({
  service_name: z.string(),
  price: z.number(),
  is_active: z.boolean().default(true),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
