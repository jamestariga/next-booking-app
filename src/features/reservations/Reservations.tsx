'use client'

import { Button } from '@/components/ui/button'
import { createReservation } from '@/server-actions/reservations'
import { toast } from 'sonner'
import { useTransition } from 'react'
import useGetUserById from '@/hooks/useGetUserById'
import { User } from '@supabase/supabase-js'

type ReservationsProps = {
  userDetails: User
}

const Reservations = ({ userDetails }: ReservationsProps) => {
  const { id } = userDetails
  const [isPending, startTransition] = useTransition()
  const userData = useGetUserById(id)

  const handleReservation = () => {
    startTransition(() => {
      createReservation()
      toast.success('Reservation created')
    })
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button onClick={handleReservation}>Reservations</Button>
    </div>
  )
}

export default Reservations
