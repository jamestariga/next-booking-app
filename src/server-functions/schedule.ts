'use server'

import { createClient } from '@/supabase/auth/server'
import { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type Schedule = Tables<'schedule'>
export type ScheduleInsert = TablesInsert<'schedule'>
export type ScheduleUpdate = TablesUpdate<'schedule'>

/**
 * Get all schedules for a barber
 */
export async function getBarberSchedule(barberId: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .eq('barber_id', barberId)
    .order('day')

  if (error) throw error

  return data
}

/**
 * Create a new schedule entry
 */
export async function createSchedule(schedule: ScheduleInsert) {
  const supabase = await createClient()

  // Check if a schedule already exists for this day and barber
  const { data: existingSchedule } = await supabase
    .from('schedule')
    .select('*')
    .eq('barber_id', schedule.barber_id)
    .eq('day', schedule.day)
    .single()

  if (existingSchedule) {
    throw new Error('A schedule already exists for this day')
  }

  const { data, error } = await supabase
    .from('schedule')
    .insert(schedule)
    .select()
    .single()

  if (error) throw error

  return data
}

/**
 * Update an existing schedule entry
 */
export async function updateSchedule(id: number, schedule: ScheduleUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('schedule')
    .update(schedule)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}

/**
 * Delete a schedule entry
 */
export async function deleteSchedule(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from('schedule').delete().eq('id', id)

  if (error) throw error

  return true
}
