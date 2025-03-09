'use server'

import { createClient } from '@/supabase/auth/server'
import { revalidatePath } from 'next/cache'

// server action for admin to add a user to the barber database

export async function addUserToBarber(userId: number) {
  const supabase = await createClient()

  const { error } = await supabase.from('barbers').insert({
    user_id: userId,
  })

  if (error) {
    console.log(error)
  }

  revalidatePath('/admin')
}

export async function removeUserFromBarber(userId: number) {
  const supabase = await createClient()

  const { error } = await supabase.from('barbers').delete().match({
    user_id: userId,
  })

  if (error) {
    console.log(error)
  }

  revalidatePath('/admin')
}
