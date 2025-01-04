import { useState, startTransition } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { createReservation } from '@/server-actions/reservations'
import { toast } from 'sonner'
import { Service } from '../types/reservations.types'
import { useRouter } from 'next/navigation'

type TimeSlot = {
  start: string
  end: string
  display: string
  active: boolean
}

type props = {
  barberId: number
  userId?: number
  service: Service
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  for (let hour = 9; hour < 20; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour

    slots.push({
      start: `${hour}:00`,
      end: `${hour + 1}:00`,
      display: `${displayHour}:00 ${ampm}`,
      active: false,
    })
  }
  return slots
}

const CalendarDateRangePicker = ({ barberId, userId, service }: props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  )
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots())
  const [isPending, setIsPending] = useState<boolean>(false)

  const router = useRouter()

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Generate time slots from 9 AM to 5 PM
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
          className='rounded-2xl border flex flex-col items-center justify-center shadow-md'
          classNames={{
            table: 'md:min-w-[400px]',
            cell: 'w-full',
            head: 'w-full',
            head_cell: 'w-full text-start text-muted-foreground px-2',
          }}
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

      {isPending && (
        <div className='mt-4'>
          <Button disabled>
            <div className='animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-primary'></div>
            <span className='ml-2'>Creating reservation...</span>
          </Button>
        </div>
      )}

      {!isPending && selectedDate && selectedTimeSlot && (
        <div className='mt-4'>
          <Button onClick={handleReservation}>Confirm Reservation</Button>
        </div>
      )}
    </div>
  )
}

export default CalendarDateRangePicker
