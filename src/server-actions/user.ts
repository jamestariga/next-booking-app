'use server'

import { createClient } from '@/supabase/auth/server'
import { FieldName, DisplayNameFields } from '../features/user/types/form.types'
import { revalidatePath } from 'next/cache'

export const updateUserDetails = async (
  updates: Partial<Record<FieldName | DisplayNameFields, string>>,
  id: number,
  user_id: string
): Promise<void> => {
  const supabase = await createClient()

  // Verify the user's authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  // Check if the user is authenticated and matches the expected user_id
  if (authError || !user || user.id !== user_id) {
    throw new Error('Unauthorized: Invalid user authentication')
  }

  const profileUpdates = { ...updates }

  if (updates.first_name || updates.last_name) {
    profileUpdates.display_name = `${updates.first_name ?? ''} ${
      updates.last_name ?? ''
    }`.trim()
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('user_id', user_id)
    .single()

  if (profileError) {
    console.log(profileError)
    throw profileError
  }

  // Update auth data if required fields are present
  if (updates.first_name || updates.last_name || updates.email) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        first_name: updates.first_name,
        last_name: updates.last_name,
      },
    })

    if (updateError) {
      console.error(updateError)
      throw updateError
    }
  }

  revalidatePath(`/account/${id}`)
}
