'use server'

import { createClient } from '@/supabase/auth/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createReservation = async () => {
  const supabase = await createClient()

  const { error } = await supabase.from('reservations').insert({
    user_id: 1,
    barber_id: 1,
    service: 'haircut',
    start: '2022-01-01 12:00:00+00',
    end: '2022-01-02 12:40:00+00',
    price: 100,
    status: 'pending',
  })

  if (error) {
    console.log(error)
    return
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
