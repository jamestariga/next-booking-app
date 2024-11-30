import { LoginFormData, SignUpFormData } from '../schema/schema'

export type FormFieldName = keyof (LoginFormData & SignUpFormData)

export type IFormLabels = {
  name: FormFieldName
  value: string
  type: string
}

export type ILogin = {
  email: string
  password: string
}

export type ISignUp = {
  email: string
  password: string
  first_name: string
  last_name: string
  location: string
  role: string
}

export type IForm = {
  type: 'Login' | 'Sign Up'
  isModal?: boolean
  error?: string
  action: (formData: FormData) => void
}

export type State = {
  success?: boolean
  error?: string
  errors?: Record<string, string[]>
  isOpen?: boolean
}
