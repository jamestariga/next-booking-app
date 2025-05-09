'use client'

import { useActionState } from 'react'
import { useRedirectOnSuccess } from '@/hooks/useRedirectOnSuccess'
import Modal from '@/components/Modal/Modal'
import AuthForm from '@/features/auth/component/AuthForm'
import { signup } from '@/server-functions/auth'
import { State } from '@/features/auth/types/auth.types'

const initialState: State = {
  isOpen: true,
  success: false,
}

const Page = () => {
  const [state, formAction] = useActionState<State, FormData>(
    signup,
    initialState
  )
  const description = 'Already have an account? '
  const url = 'login'

  useRedirectOnSuccess(state.success, '/account', 'Sign up successful!')

  return (
    <Modal
      title='Sign Up'
      isOpen={state.isOpen ?? true}
      description={description}
      link={url}
      linkTitle='Login'
    >
      <AuthForm
        type='Sign Up'
        isModal={true}
        error={state?.error}
        action={formAction}
      />
    </Modal>
  )
}

export default Page
