'use client'

import { useActionState } from 'react'
import { updateAppointment } from '@/server-actions/reservations'
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
import useRedirectOnSuccess from '@/hooks/useRedirectOnSuccess'

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
  const [state, formAction] = useActionState<State, AppointmentStatus>(
    updateAppointment,
    initialState
  )
  const displayType = type === 'appointment' ? 'Customer' : 'Barber'
  const displayName =
    type === 'appointment'
      ? clientData?.display_name
      : barberData?.profiles?.display_name

  useRedirectOnSuccess(
    state?.success,
    `/appointments`,
    'Updated Successfully!',
    true
  )

  console.log(state)

  return (
    <Modal
      title='Appointment'
      description='Book your next visit'
      isOpen={state.isOpen ?? true}
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
