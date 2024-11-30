import { IFormLabels } from '../types/auth.types'

export const loginLabels: IFormLabels[] = [
  { name: 'email', value: 'Email', type: 'email' },
  { name: 'password', value: 'Password', type: 'password' },
]

export const signUpLabels: IFormLabels[] = [
  { name: 'email', value: 'Email*', type: 'email' },
  { name: 'password', value: 'Password*', type: 'password' },
  { name: 'confirm_password', value: 'Confirm Password*', type: 'password' },
  { name: 'first_name', value: 'First Name*', type: 'text' },
  { name: 'last_name', value: 'Last Name*', type: 'text' },
  { name: 'role', value: 'Role*', type: 'text' },
]
