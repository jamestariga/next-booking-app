'use client'

import { useActionState, useEffect } from 'react'
import { signup } from '@/server-actions/auth'
import AuthForm from './component/AuthForm'
import { useRouter } from 'next/navigation'
import { IFormLabels, State } from './types/auth.types'

const initialState: State = {
  isOpen: true,
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

  const labels: IFormLabels[] = [
    { name: 'email', value: 'Email', type: 'email' },
    { name: 'password', value: 'Password', type: 'password' },
    { name: 'confirm_password', value: 'Confirm Password', type: 'password' },
    { name: 'first_name', value: 'First Name', type: 'text' },
    { name: 'last_name', value: 'Last Name', type: 'text' },
    { name: 'role', value: 'Role', type: 'text' },
  ]

  return (
    <div className='max-w-xl w-full mx-auto border-secondary px-10 rounded-lg dark:shadow-lg shadow-2xl'>
      <AuthForm
        type='Sign Up'
        labels={labels}
        error={state?.error}
        action={formAction}
      />
    </div>
  )
}

export default SignUpForm
