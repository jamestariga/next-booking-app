'use client'

import Modal from '@/components/Modal/Modal'
import { Appointment } from '@/features/reservations/types/reservations.types'
import {
  IBarberProfile,
  IProfile,
} from '@/features/appointments/types/appointments.types'

type Props = {
  type: 'appointment' | 'reservation'
  data: Appointment
  barberData?: IBarberProfile
  clientData?: IProfile
}

const Appointments = ({ type, data, barberData, clientData }: Props) => {
  const displayType = type === 'appointment' ? 'Customer' : 'Barber'
  const displayName =
    type === 'appointment'
      ? clientData?.display_name
      : barberData?.profiles?.display_name

  return (
    <Modal
      title='Appointment'
      description='Book your next visit'
      isOpen={true}
      link='/'
      linkTitle='View Appointments'
    >
      <div>Service: {data?.service.service_name}</div>
      <div>{`${displayType}: ${displayName} `}</div>
      <div>Status: {data?.status}</div>
    </Modal>
  )
}

export default Appointments
