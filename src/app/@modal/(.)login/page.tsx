'use client'

import { useActionState } from 'react'
import useRedirectOnSuccess from '@/hooks/useRedirectOnSuccess'
import Modal from '@/components/Modal/Modal'
import AuthForm from '@/features/auth/component/AuthForm'
import { login } from '@/server-actions/auth'
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

  useRedirectOnSuccess(state?.success!, '/account')

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
