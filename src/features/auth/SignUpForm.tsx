'use client'

import { useRedirectOnSuccess } from '@/hooks/useRedirectOnSuccess'
import { useActionState } from 'react'
import { signup } from '@/server-functions/auth'
import AuthForm from './component/AuthForm'
import { State } from './types/auth.types'

const initialState: State = {
  success: false,
}

const SignUpForm = () => {
  const [state, formAction] = useActionState<State, FormData>(
    signup,
    initialState
  )

  useRedirectOnSuccess(state.success, '/account', 'Sign up successful!')

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm type='Sign Up' error={state?.error} action={formAction} />
    </div>
  )
}

export default SignUpForm
