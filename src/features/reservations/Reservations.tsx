'use client'

import useGetUserById from '@/hooks/useGetUserById'
import { User } from '@supabase/supabase-js'
import CalendarDateRangePicker from './components/CalendarDateRangePicker'

type ReservationsProps = {
  userDetails: User
  barberId: number
  barberName: string
}

const Reservations = ({
  userDetails,
  barberId,
  barberName,
}: ReservationsProps) => {
  const { id } = userDetails
  const userData = useGetUserById(id)

  return (
    <div className='space-y-6'>
      <h1 className='font-bold text-xl md:text-2xl'>
        Appointment with {barberName}!
      </h1>
      <CalendarDateRangePicker barberId={barberId} userId={userData?.id} />
    </div>
  )
}

export default Reservations
