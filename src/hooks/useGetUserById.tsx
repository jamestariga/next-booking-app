'use client'

import { createClient } from '@/supabase/auth/client'
import { useEffect, useState } from 'react'

const useGetUserById = (id: string) => {
  const supabase = createClient()

  const [user, setUser] = useState<any>()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', id)
        .single()

      setUser(data)
    }

    getUser()
  }, [supabase, id])

  return user
}

export default useGetUserById
