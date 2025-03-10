import { Schedule } from '@/server-functions/schedule'

// Day of week mapping (0 = Sunday, 1 = Monday, etc.)
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
]

// Generate time options in 30-minute increments
export const generateTimeOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourFormatted = hour.toString().padStart(2, '0')
      const minuteFormatted = minute.toString().padStart(2, '0')
      const value = `${hourFormatted}:${minuteFormatted}`

      // Format for display (12-hour format)
      let displayHour = hour % 12
      if (displayHour === 0) displayHour = 12
      const period = hour < 12 ? 'AM' : 'PM'
      const display = `${displayHour}:${minuteFormatted} ${period}`

      options.push({ value, display })
    }
  }
  return options
}

// Get day name from day number
export const getDayName = (day: number) => {
  return DAYS_OF_WEEK.find((d) => d.value === day)?.label || 'Unknown'
}

// Format time for display (convert from 24h to 12h format)
export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

// Sort schedules by day of week
export const sortSchedulesByDay = (schedules: Schedule[]) => {
  return [...schedules].sort((a, b) => a.day - b.day)
}

// Group schedules by day for easier rendering
export const groupSchedulesByDay = (schedules: Schedule[]) => {
  const grouped: Record<number, Schedule[]> = {}

  schedules.forEach((schedule) => {
    if (!grouped[schedule.day]) {
      grouped[schedule.day] = []
    }
    grouped[schedule.day].push(schedule)
  })

  return grouped
}
