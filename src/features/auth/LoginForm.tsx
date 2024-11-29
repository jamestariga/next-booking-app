'use client'

import { useActionState, useEffect } from 'react'
import { login } from '@/server-actions/auth'
import AuthForm from './component/AuthForm'
import { useRouter } from 'next/navigation'
import { IFormLabels, State } from './types/auth.types'
import { toast } from 'sonner'

const initialState: State = {
  isOpen: true,
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

  const labels: IFormLabels[] = [
    { name: 'email', value: 'Email', type: 'email' },
    { name: 'password', value: 'Password', type: 'password' },
  ]

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm
        type='Login'
        labels={labels}
        error={state?.error}
        action={formAction}
      />
    </div>
  )
}

export default LoginForm
