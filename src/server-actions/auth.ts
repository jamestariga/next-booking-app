'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/supabase/auth/server'
import { State } from '@/features/auth/types/auth.types'
import { LoginSchema, SignUpSchema } from '@/features/auth/schema/schema'

export async function login(
  prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = await createClient()

  // Parse and validate form data
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const result = LoginSchema.safeParse(rawData)

  if (!result.success) {
    return {
      ...prevState,
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  // Wrong Credentials
  if (error) {
    return {
      ...prevState,
      success: false,
      error: error.message,
    }
  }

  revalidatePath('/login', 'layout')

  // On success, close the modal by setting isOpen to false
  return {
    success: true,
    isOpen: false, // This will close the modal
  }
}

export async function signup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = await createClient()

  // Parse and validate form data
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    role: formData.get('role'),
  }

  const result = SignUpSchema.safeParse(rawData)

  if (!result.success) {
    return {
      ...prevState,
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        display_name: `${result.data.first_name} ${result.data.last_name}`,
        role: result.data.role,
      },
    },
  })

  // User already exists
  if (error) {
    return {
      ...prevState,
      success: false,
      error: error.message,
    }
  }

  revalidatePath('/signup', 'layout')

  // On success, close the modal by setting isOpen to false
  return {
    success: true,
    isOpen: false, // This will close the modal
  }
}

export const signOut = async () => {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
}
