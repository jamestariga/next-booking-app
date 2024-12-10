'use server'

import { Service } from '@/features/reservations/types/reservations.types'
import { createClient } from '@/supabase/auth/server'
import { revalidatePath } from 'next/cache'

type Reservation = {
  userId: number
  barberId: number
  start: string
  date: Date
  end: string
  service: Service
}

export const createReservation = async ({
  userId,
  barberId,
  date,
  start,
  end,
  service,
}: Reservation) => {
  const supabase = await createClient()
  const dateStr = date ? date.toISOString().split('T')[0] : ''
  const startStr = `${dateStr} ${start}`
  const endStr = `${dateStr} ${end}`

  const { error } = await supabase.from('reservations').insert({
    user_id: userId,
    barber_id: barberId,
    service: service,
    start: startStr,
    end: endStr,
    status: 'pending',
  })

  if (error) {
    console.log(error)
    return
  }

  revalidatePath(`/barber/${barberId}`, 'layout')
}
