'use client'

import { useActionState, useEffect } from 'react'
import { login } from '@/server-actions/auth'
import AuthForm from './component/AuthForm'
import { useRouter } from 'next/navigation'
import { IFormLabels, State } from './types/auth.types'
import { toast } from 'sonner'

const initialState: State = {
  success: false,
}

const LoginForm = () => {
  const [state, formAction] = useActionState<State, FormData>(
    login,
    initialState
  )
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/')
      toast('Login successful!')
    }
  }, [state?.success, router])

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm type='Login' error={state?.error} action={formAction} />
    </div>
  )
}

export default LoginForm
