'use client'

import { usePathname } from 'next/navigation'
import { useActionState } from '@/hooks/useActionState'
import { useRedirectOnSuccess } from '@/hooks/useRedirectOnSuccess'
import { updateAppointment } from '@/server-functions/reservations'
import Modal from '@/components/Modal/Modal'
import {
  Appointment,
  AppointmentStatus,
} from '@/features/reservations/types/reservations.types'
import {
  IBarberProfile,
  IProfile,
} from '@/features/appointments/types/appointments.types'
import AppointmentForm from './components/AppointmentForm'
import { State } from '../auth/types/auth.types'

type Props = {
  type: 'appointment' | 'reservation'
  data: Appointment
  barberData?: IBarberProfile
  clientData?: IProfile
}

const initialState: State = {
  isOpen: true,
  success: false,
}

const Appointments = ({ type, data, barberData, clientData }: Props) => {
  // Custom useActionState hook to handle the state and reset the state
  const [state, formAction, , reset] = useActionState<State, AppointmentStatus>(
    updateAppointment,
    initialState
  )
  const pathname = usePathname()

  const displayType = type === 'reservation' ? 'Customer' : 'Barber'
  const displayName =
    type === 'appointment'
      ? clientData?.display_name
      : barberData?.profiles?.display_name

  useRedirectOnSuccess(
    state?.success,
    `${type === 'appointment' ? '/appointments' : '/reservations'}`,
    'Updated Successfully!',
    true,
    reset
  )

  return (
    <Modal
      title={`${type === 'appointment' ? 'Appointment' : 'Reservation'}`}
      description='Book your next visit'
      isOpen={
        pathname === '/appointments' || pathname === '/reservations'
          ? false
          : state.isOpen ?? true
      }
      link='/'
      linkTitle='View Appointments'
    >
      <AppointmentForm
        id={data.id}
        service={data?.service.service_name}
        type={displayType}
        status={data?.status}
        displayName={displayName}
        action={formAction}
      />
    </Modal>
  )
}

export default Appointments
