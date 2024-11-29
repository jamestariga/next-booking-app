'use client'

import { useFormStatus } from 'react-dom'
import { startTransition } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IForm } from '../types/auth.types'
import {
  LoginSchema,
  SignUpSchema,
  LoginFormData,
  SignUpFormData,
} from '../schema/schema'

type LoginFields = keyof LoginFormData
type SignUpFields = keyof SignUpFormData

const AuthForm = ({ type, labels, error, action }: IForm) => {
  const { pending } = useFormStatus()
  const isLogin = type === 'Login'

  const initialValues = isLogin
    ? { email: '', password: '' }
    : {
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        role: 'user',
      }

  const form = useForm<LoginFormData | SignUpFormData>({
    resolver: zodResolver(isLogin ? LoginSchema : SignUpSchema),
    defaultValues: initialValues,
  })

  const isLoginField = (field: string): field is LoginFields => {
    return ['email', 'password'].includes(field)
  }

  const isSignUpField = (field: string): field is SignUpFields => {
    return [
      'email',
      'password',
      'confirm_password',
      'first_name',
      'last_name',
      'role',
    ].includes(field)
  }

  const getFieldError = (
    errors: FieldErrors<LoginFormData | SignUpFormData>,
    fieldName: string
  ): string | undefined => {
    if (!isLogin && isSignUpField(fieldName)) {
      return (errors as FieldErrors<SignUpFormData>)[fieldName]?.message
    } else if (isLogin && isLoginField(fieldName)) {
      return (errors as FieldErrors<LoginFormData>)[fieldName]?.message
    }
    return undefined
  }

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    startTransition(() => {
      action(formData)
    })
  })

  const renderFields = () => {
    const loginFields = ['email', 'password']
    const signUpFields = [
      'email',
      'password',
      'confirm_password',
      'first_name',
      'last_name',
    ]

    const fieldsToRender = isLogin ? loginFields : signUpFields

    return fieldsToRender.map((fieldName) => {
      // Find the corresponding label configuration
      const labelConfig = labels.find((label) => label.name === fieldName)

      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName as keyof (LoginFormData | SignUpFormData)}
          render={({ field: inputField }) => (
            <FormItem>
              <FormLabel>{labelConfig?.value || fieldName}</FormLabel>
              <FormControl>
                <Input
                  type={labelConfig?.type || 'text'}
                  placeholder={labelConfig?.value || fieldName}
                  {...inputField}
                />
              </FormControl>
              <FormMessage>
                {getFieldError(form.formState.errors, fieldName)}
              </FormMessage>
            </FormItem>
          )}
        />
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-8 max-w-3xl mx-auto py-10'>
        {renderFields()}
        {error && <div className='text-red-500'>{error}</div>}
        <Button
          type='submit'
          disabled={pending}
          className='w-full bg-gradient-to-r from-sky-500 to-indigo-500'
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
