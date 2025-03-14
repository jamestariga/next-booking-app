'use server'

import { createClient } from '@/supabase/auth/server'
import { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type Service = Tables<'services'>
export type ServiceInsert = TablesInsert<'services'>
export type ServiceUpdate = TablesUpdate<'services'>

/**
 * Get all services for a barber
 */
export async function getBarberServices(barberId: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('barber_id', barberId)

  if (error) throw error

  return data
}

/**
 * Create a new service entry
 */
export async function createService(service: ServiceInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single()

  if (error) throw error

  return data
}

/**
 * Update an existing service entry
 */
export async function updateService(id: number, service: ServiceUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}

/**
 * Delete a service entry
 */
export async function deleteService(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from('services').delete().eq('id', id)

  if (error) throw error

  return true
}
