'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useRedirectOnSuccess = (success: boolean, redirectPath = '/') => {
  const router = useRouter()

  useEffect(() => {
    if (success) {
      router.push(redirectPath)
      toast('Login successful!')
    }
  }, [success, router, redirectPath])
}

export default useRedirectOnSuccess
