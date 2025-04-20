import { useState, startTransition, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { createReservation } from '@/server-functions/reservations'
import { Service } from '@/server-functions/services'
import { Schedule } from '@/server-functions/schedule'
import { TimeSlot } from '../types/reservations.types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { generateTimeSlots } from '../utils/helpers'

type props = {
  barberId: number
  userId?: number
  service: Service
  schedule: Schedule[]
}

const CalendarDateRangePicker = ({
  barberId,
  userId,
  service,
  schedule,
}: props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  )
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)

  const router = useRouter()

  // Update time slots when date changes
  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDate, schedule))
    setSelectedTimeSlot(null)
  }, [selectedDate, schedule])

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if the barber works on this day
    const dayOfWeek = date.getDay()
    const hasSchedule = schedule.some((s) => s.day === dayOfWeek && s.is_active)

    return date < today || !hasSchedule
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((s) =>
        s.start === slot.start
          ? { ...s, active: !s.active }
          : { ...s, active: false }
      )
    )
    setSelectedTimeSlot((prevSelected) =>
      prevSelected && prevSelected.start === slot.start
        ? null
        : { ...slot, active: true }
    )
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

      await createReservation({
        userId: userId!,
        barberId: barberId,
        date: selectedDate,
        start: selectedTimeSlot.start,
        end: selectedTimeSlot.end,
        service: service,
      })

      toast('Reservation created successfully')

      startTransition(() => {
        setSelectedDate(undefined)
        setSelectedTimeSlot(null)
        router.push(`/reservations`)
      })
    } catch (error) {
      console.log(error)
      toast.error('Failed to create reservation')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full'>
        <h3 className='mb-4 text-lg font-medium'>Select Date</h3>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={isDateDisabled}
          required
          className='rounded-2xl border flex flex-col items-center justify-center shadow-md'
          classNames={{
            table: 'md:min-w-[400px]',
            cell: 'w-full',
            head: 'w-full',
            head_cell: 'w-full text-start text-muted-foreground px-2',
          }}
        />
      </div>

      {selectedDate && timeSlots.length > 0 && (
        <div>
          <h3 className='mb-4 text-lg font-medium'>
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                variant={slot.active ? 'default' : 'outline'}
                className={cn(
                  'w-full',
                  slot.active && 'bg-primary text-primary-foreground'
                )}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot.display}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && timeSlots.length === 0 && (
        <div className='p-4 border rounded-md bg-muted'>
          <p className='text-center text-muted-foreground'>
            No available time slots for this date.
          </p>
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

      <div className='mt-4'>
        <Button
          onClick={handleReservation}
          disabled={isPending || !selectedDate || !selectedTimeSlot}
        >
          Confirm Reservation
        </Button>
      </div>
    </div>
  )
}

export default CalendarDateRangePicker
