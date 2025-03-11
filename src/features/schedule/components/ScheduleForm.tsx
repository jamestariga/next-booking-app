'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Form } from '@/components/ui/form'

import {
  Schedule,
  createSchedule,
  updateSchedule,
} from '@/server-functions/schedule'
import ScheduleFormFields from './ScheduleFormFields'
import { scheduleSchema, type ScheduleFormData } from '../schema/schema'

type ScheduleFormProps = {
  barberId: number
  mode: 'create' | 'update'
  schedule?: Schedule
  onSuccess?: () => void
}

const ScheduleForm = ({
  barberId,
  mode,
  schedule,
  onSuccess,
}: ScheduleFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEditing = mode === 'update'

  // Validate that we have a schedule when in update mode
  if (isEditing && !schedule) {
    throw new Error('Schedule is required when mode is "update"')
  }

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues:
      isEditing && schedule
        ? {
            day: schedule.day,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            is_active: schedule.is_active,
          }
        : {
            day: 1, // Default to Monday
            start_time: '09:00',
            end_time: '17:00',
            is_active: true,
          },
  })

  const onSubmit = async (values: ScheduleFormData) => {
    startTransition(async () => {
      try {
        if (isEditing && schedule) {
          await updateSchedule(schedule.id, {
            ...values,
            barber_id: schedule.barber_id,
          })
          toast.success('Schedule updated successfully')
        } else {
          await createSchedule({
            ...values,
            barber_id: barberId,
          })
          toast.success('Schedule created successfully')
          form.reset() // Only reset the form after creation
        }

        if (onSuccess) {
          onSuccess()
        } else {
          router.refresh()
        }
      } catch (error) {
        console.error(error)
        toast.error(
          error instanceof Error
            ? error.message
            : `Failed to ${isEditing ? 'update' : 'create'} schedule`
        )
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <ScheduleFormFields
          form={form}
          isPending={isPending}
          isEditing={isEditing}
        />
      </form>
    </Form>
  )
}

export default ScheduleForm
