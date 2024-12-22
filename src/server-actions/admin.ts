'use server'

import { createClient } from '@/supabase/auth/server'

// server action for admin to add a user to the barber database

export async function addUserToBarber(userId: number) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('barbers').insert({
    user_id: userId,
  })

  if (error) {
    console.log(error)
  }

  console.log(data)
}
