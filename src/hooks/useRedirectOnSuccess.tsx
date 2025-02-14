'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const useRedirectOnSuccess = (
  success: boolean,
  redirectPath = '/',
  message: string
) => {
  const router = useRouter()

  useEffect(() => {
    if (success) {
      router.push(redirectPath)
      toast(message)
    }
  }, [success, router, redirectPath, message])
}

export default useRedirectOnSuccess
