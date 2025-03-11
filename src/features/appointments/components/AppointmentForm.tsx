import { useState, startTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AppointmentStatus } from '@/features/reservations/types/reservations.types'

type Props = {
  id: number
  service: string
  type: 'Customer' | 'Barber'
  status: string
  displayName: string | undefined
  action: (payload: AppointmentStatus) => void
}

const AppointmentForm = ({
  id,
  service,
  type,
  status,
  displayName,
  action,
}: Props) => {
  const [currentStatus, setCurrentStatus] = useState<string>(status)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onSelectStatus = (value: string) => {
    setCurrentStatus(value)
  }

  const updateAndClose = (id: number, newStatus: string) => {
    startTransition(() => {
      action({ id, status: newStatus })
      setIsEditing(false)
    })
  }

  return (
    <>
      {!isEditing ? (
        <div className='flex flex-col w-full gap-2 py-4 justify-between'>
          <div>
            <p>Service: {service}</p>
            <p>{`${type}: ${displayName}`}</p>
            <p>Status: {currentStatus}</p>
          </div>
          {type === 'Barber' && (
            <Button onClick={() => setIsEditing(true)}>Update Status</Button>
          )}
        </div>
      ) : (
        <div className='flex flex-col w-full gap-2 py-4'>
          <h2 className='text-[hsl(var(--muted-foreground))]'>Update Status</h2>
          <Select onValueChange={onSelectStatus} value={currentStatus}>
            <SelectTrigger>
              <SelectValue placeholder='Select a status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='confirmed'>Confirmed</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className='w-full space-x-2'>
            <Button onClick={() => updateAndClose(id, currentStatus)}>
              Update Status
            </Button>
            <Button onClick={() => setIsEditing(false)} variant='destructive'>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default AppointmentForm
