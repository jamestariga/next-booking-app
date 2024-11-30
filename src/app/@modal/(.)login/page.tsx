'use client'

import { useActionState, useEffect } from 'react'
import Modal from '@/components/Modal/Modal'
import AuthForm from '@/features/auth/component/AuthForm'
import { login } from '@/server-actions/auth'
import { useRouter } from 'next/navigation'
import { State } from '@/features/auth/types/auth.types'

const initialState: State = {
  isOpen: true,
  success: false,
}

const Page = () => {
  const [state, formAction] = useActionState<State, FormData>(
    login,
    initialState
  )
  const description = "Don't have an account? "
  const url = 'signup'

  const router = useRouter()

  // Handle redirect on successful login
  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state?.success, router])

  return (
    <Modal
      title='Login'
      isOpen={state.isOpen ?? true}
      description={description}
      link={url}
      linkTitle='Sign Up'
    >
      <AuthForm
        type='Login'
        isModal={true}
        error={state?.error}
        action={formAction}
      />
    </Modal>
  )
}

export default Page
