'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Schedule, deleteSchedule } from '@/server-functions/schedule'
import { DAYS_OF_WEEK, formatTime } from '../utils'
import ScheduleForm from './ScheduleForm'
import ScheduleDialog from './ScheduleDialog'

type ScheduleListProps = {
  schedules: Schedule[]
  barberId: number
}

const ScheduleList = ({ schedules, barberId }: ScheduleListProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    mode: 'create' | 'update' | null
  }>({
    isOpen: false,
    mode: null,
  })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Sort schedules by day of week
  const sortedSchedules = [...schedules].sort((a, b) => a.day - b.day)

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      try {
        await deleteSchedule(id)
        toast.success('Schedule deleted successfully')
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete schedule')
      }
    })
  }

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setDialogState({ isOpen: true, mode: 'update' })
  }

  const handleCreateSuccess = () => {
    setDialogState({ isOpen: false, mode: null })
    router.refresh()
  }

  const handleUpdateSuccess = () => {
    setDialogState({ isOpen: false, mode: null })
    setEditingSchedule(null)
    router.refresh()
  }

  const handleCreateOpen = (day: number) => {
    setDialogState({ isOpen: true, mode: 'create' })
    setSelectedDay(day)
  }

  const handleDialogClose = () => {
    setDialogState({ isOpen: false, mode: null })
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      setDialogState({ isOpen: true, mode: 'create' })
    } else {
      setDialogState({ isOpen: false, mode: null })
      setSelectedDay(1)
    }
  }

  // Create a map of days to easily check which days have schedules
  const scheduledDays = new Map(sortedSchedules.map((s) => [s.day, s]))

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Weekly Schedule</h2>
        <ScheduleDialog
          mode='form'
          title='Add New Schedule'
          description='Create a new schedule for a day of the week'
          triggerButton={{
            label: 'Add Schedule',
            icon: <Plus className='size-4' />,
          }}
          isOpen={dialogState.isOpen && dialogState.mode === 'create'}
          onOpenChange={handleDialogOpenChange}
        >
          <ScheduleForm
            barberId={barberId}
            mode='create'
            day={selectedDay ?? undefined}
            onSuccess={handleCreateSuccess}
          />
        </ScheduleDialog>
      </div>

      {editingSchedule && (
        <ScheduleDialog
          mode='form'
          title='Edit Schedule'
          description='Update the schedule for this day'
          isOpen={dialogState.isOpen && dialogState.mode === 'update'}
          onOpenChange={handleDialogClose}
        >
          <ScheduleForm
            barberId={barberId}
            mode='update'
            schedule={editingSchedule}
            onSuccess={handleUpdateSuccess}
          />
        </ScheduleDialog>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {DAYS_OF_WEEK.map((day) => {
          const schedule = scheduledDays.get(day.value)

          return (
            <Card key={day.value} className={!schedule ? 'opacity-60' : ''}>
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-center'>
                  <CardTitle>{day.label}</CardTitle>
                  {schedule && (
                    <Badge variant={schedule.is_active ? 'default' : 'outline'}>
                      {schedule.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {schedule
                    ? `${formatTime(schedule.start_time)} - ${formatTime(
                        schedule.end_time
                      )}`
                    : 'No schedule set'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex justify-end space-x-2'>
                  {schedule ? (
                    <>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(schedule)}
                      >
                        <Pencil className='size-4 mr-1' />
                        Edit
                      </Button>
                      <ScheduleDialog
                        mode='confirm'
                        title='Delete Schedule'
                        description={`Are you sure you want to delete the schedule for ${day.label}? This action cannot be undone.`}
                        triggerButton={{
                          label: 'Delete',
                          variant: 'destructive',
                          size: 'sm',
                          icon: <Trash2 className='size-4' />,
                        }}
                        isPending={isPending}
                        onConfirm={() => handleDelete(schedule.id)}
                      />
                    </>
                  ) : (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleCreateOpen(day.value)}
                    >
                      <Plus className='size-4 mr-1' />
                      Add Schedule
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleList
