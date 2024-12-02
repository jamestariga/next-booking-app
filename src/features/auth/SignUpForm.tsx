'use client'

import { useActionState } from 'react'
import { signup } from '@/server-actions/auth'
import AuthForm from './component/AuthForm'
import { State } from './types/auth.types'
import useRedirectOnSuccess from '@/hooks/useRedirectOnSuccess'

const initialState: State = {
  success: false,
}

const SignUpForm = () => {
  const [state, formAction] = useActionState<State, FormData>(
    signup,
    initialState
  )

  useRedirectOnSuccess(state?.success!, '/account')

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm type='Sign Up' error={state?.error} action={formAction} />
    </div>
  )
}

export default SignUpForm
