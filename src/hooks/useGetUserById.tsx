'use client'

import { createClient } from '@/supabase/auth/client'
import { useEffect, useState } from 'react'

type User = {
  id: number
  display_name: string
  user_id: string
  first_name: string
  last_name: string
  created_at: string
  role: string
}

const useGetUserById = (id: string) => {
  const supabase = createClient()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', id)
        .single()

      if (data) {
        setUser(data)
      }
    }

    getUser()
  }, [supabase, id])

  return user
}

export default useGetUserById
