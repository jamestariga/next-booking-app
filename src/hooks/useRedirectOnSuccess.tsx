'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useRedirectOnSuccess(
  success: boolean,
  redirectPath = '/',
  message: string,
  refresh: boolean = false,
  reset?: () => void
) {
  const router = useRouter()

  useEffect(() => {
    /* Use by the auth routes, no need to reset 
    the state since the redirect path will change */
    if (success && !reset) {
      router.push(redirectPath)
      toast(message)
    }

    /* Use by components that need to redirect on 
    success and reset the state */
    if (success && refresh && reset) {
      router.push(redirectPath)
      toast(message)
      setTimeout(() => {
        reset()
      }, 1000)
    }
  }, [success, router, redirectPath, message, refresh, reset])
}
