// This component will handle the date and time picker
// Workflow: User selects a date then a time selection will show up and show the list of times with intervals of 1 hour in between (e.g 5 - 6 pm, 6 - 7pm)
// User selects a time and then submits the reservation using the reservations server action

'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { createReservation } from '@/server-actions/reservations'
import { toast } from 'sonner'

type TimeSlot = {
  start: string
  end: string
}

type props = {
  barberId: number
  userId?: number
}

const CalendarDateRangePicker = ({ barberId, userId }: props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  )
  const [isPending, setIsPending] = useState(false)

  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    for (let hour = 9; hour < 17; hour++) {
      slots.push({
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
      })
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
  }

  const handleReservation = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select both date and time')
      return
    }

    setIsPending(true)
    try {
      // Combine date and time for start/end times
      const [startHour] = selectedTimeSlot.start.split(':')
      const [endHour] = selectedTimeSlot.end.split(':')

      const startDate = new Date(selectedDate)
      startDate.setHours(parseInt(startHour), 0, 0)

      const endDate = new Date(selectedDate)
      endDate.setHours(parseInt(endHour), 0, 0)

      // await createReservation()
      toast('Reservation created successfully')

      // Reset selections
      setSelectedDate(undefined)
      setSelectedTimeSlot(null)
    } catch (error) {
      toast.error('Failed to create reservation')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='w-full'>
        <h3 className='mb-4 text-lg font-medium'>Select Date</h3>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={isDateDisabled}
          className='rounded-md border flex flex-col items-center justify-center'
        />
      </div>

      {selectedDate && (
        <div>
          <h3 className='mb-4 text-lg font-medium'>
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                className={cn(
                  'w-full',
                  selectedTimeSlot === slot &&
                    'bg-primary text-primary-foreground'
                )}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot.start}
              </Button>
            ))}
          </div>
        </div>
      )}

      {isPending && (
        <div className='mt-4'>
          <Button disabled>
            <div className='animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-primary'></div>
            <span className='ml-2'>Creating reservation...</span>
          </Button>
        </div>
      )}

      {selectedDate && selectedTimeSlot && (
        <div className='mt-4'>
          <Button onClick={handleReservation}>Confirm Reservation</Button>
        </div>
      )}
      <code>
        {JSON.stringify({
          selectedDate,
          selectedTimeSlot,
          barberId,
          userId,
        })}
      </code>
    </div>
  )
}

export default CalendarDateRangePicker
