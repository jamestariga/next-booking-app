import { cache } from 'react'
import { createClient } from '@/supabase/auth/server'

export const cachedUser = cache(async () => {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const { user } = userData
  return user
})
