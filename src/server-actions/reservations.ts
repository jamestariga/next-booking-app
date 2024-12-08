'use server'

import { createClient } from '@/supabase/auth/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type Reservation = {
  userId: number
  barberId: number
  start: string
  date: Date
  end: string
}

export const createReservation = async ({
  userId,
  barberId,
  date,
  start,
  end,
}: Reservation) => {
  const supabase = await createClient()
  const dateStr = date ? date.toISOString().split('T')[0] : ''
  const startStr = `${dateStr} ${start}`
  const endStr = `${dateStr} ${end}`

  const { error } = await supabase.from('reservations').insert({
    user_id: userId,
    barber_id: barberId,
    service: 'haircut',
    start: startStr,
    end: endStr,
    price: 100,
    status: 'pending',
  })

  if (error) {
    console.log(error)
    return
  }

  revalidatePath(`/barber/${barberId}`, 'layout')
}
