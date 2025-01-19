import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: string) {
  // Add 8 hours to convert from PST to UTC display
  const date = new Date(dateString)
  date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // Add 8 hours
  return format(date, "MMM d, yyyy 'at' h:mm a 'PST'")
}
