'use client'

import { useTransition } from 'react'
import useGetUserById from '@/hooks/useGetUserById'
import { User } from '@supabase/supabase-js'
import CalendarDateRangePicker from './components/CalendarDateRangePicker'

type ReservationsProps = {
  userDetails: User
  barberId: number
}

const Reservations = ({ userDetails, barberId }: ReservationsProps) => {
  const { id } = userDetails
  const [isPending, startTransition] = useTransition()
  const userData = useGetUserById(id)

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Reservations</h1>
      <CalendarDateRangePicker barberId={barberId} userId={userData?.id} />
    </div>
  )
}

export default Reservations
