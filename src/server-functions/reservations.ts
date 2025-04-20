'use server'

import { State } from '@/features/auth/types/auth.types'
import { AppointmentStatus } from '@/features/reservations/types/reservations.types'
import { Service } from '@/server-functions/services'
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

export const updateAppointment = async (
  prevState: State,
  payload: AppointmentStatus
): Promise<State> => {
  const supabase = await createClient()
  const { id, status } = payload

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.log(error)
    return {
      ...prevState,
      success: false,
      error: error.message,
    }
  }

  revalidatePath(`/appointments/${id}`, 'layout')

  return {
    isOpen: false,
    success: true,
  }
}
