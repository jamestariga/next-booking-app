import { z } from 'zod'

export const scheduleSchema = z
  .object({
    day: z.number(),
    start_time: z.string(),
    end_time: z.string(),
    is_active: z.boolean().default(true),
  })
  .refine(
    (data) => {
      // Ensure end time is after start time
      return data.start_time < data.end_time
    },
    {
      message: 'End time must be after start time',
      path: ['end_time'],
    }
  )
export type ScheduleFormData = z.infer<typeof scheduleSchema>
