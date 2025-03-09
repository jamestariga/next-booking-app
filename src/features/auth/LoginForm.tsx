'use client'

import { useActionState } from 'react'
import { useRedirectOnSuccess } from '@/hooks/useRedirectOnSuccess'
import { login } from '@/server-functions/auth'
import AuthForm from './component/AuthForm'
import { State } from './types/auth.types'

const initialState: State = {
  success: false,
}

const LoginForm = () => {
  const [state, formAction] = useActionState<State, FormData>(
    login,
    initialState
  )

  useRedirectOnSuccess(state.success, '/account', 'Login successful!')

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm type='Login' error={state?.error} action={formAction} />
    </div>
  )
}

export default LoginForm
