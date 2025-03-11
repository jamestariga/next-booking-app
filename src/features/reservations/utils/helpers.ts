import { Schedule } from '@/server-functions/schedule'
import { TimeSlot } from '../types/reservations.types'

// Helper function to convert 24h time to 12h display format
export const formatTimeDisplay = (time: string): string => {
  const [hours] = time.split(':').map(Number)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 || 12
  return `${displayHour}:00 ${ampm}`
}

// Generate time slots based on barber's schedule for the selected day
export const generateTimeSlots = (
  selectedDate: Date | undefined,
  schedule: Schedule[]
): TimeSlot[] => {
  if (!selectedDate) return []

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = selectedDate.getDay()

  // Find the schedule for the selected day
  const daySchedule = schedule.find((s) => s.day === dayOfWeek && s.is_active)

  // If no schedule found or not active, return empty array
  if (!daySchedule) return []

  const slots: TimeSlot[] = []

  // Parse start and end times
  const [startHour] = daySchedule.start_time.split(':').map(Number)
  const [endHour] = daySchedule.end_time.split(':').map(Number)

  // Generate slots from start time to end time
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      start: `${hour}:00`,
      end: `${hour + 1}:00`,
      display: formatTimeDisplay(`${hour}:00`),
      active: false,
    })
  }

  return slots
}
