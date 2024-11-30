'use client'

import { useActionState, useEffect } from 'react'
import { signup } from '@/server-actions/auth'
import AuthForm from './component/AuthForm'
import { useRouter } from 'next/navigation'
import { State } from './types/auth.types'

const initialState: State = {
  success: false,
}

const SignUpForm = () => {
  const [state, formAction] = useActionState<State, FormData>(
    signup,
    initialState
  )
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state?.success, router])

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm type='Sign Up' error={state?.error} action={formAction} />
    </div>
  )
}

export default SignUpForm
