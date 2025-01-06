'use client'

import Modal from '@/components/Modal/Modal'
import { Appointment } from '@/features/reservations/types/reservations.types'

const Appointments = ({ data }: { data: Appointment }) => {
  return (
    <Modal
      title='Appointment'
      description='Book your next visit'
      isOpen={true}
      link='/'
      linkTitle='View Appointments'
    >
      <div>{data?.service.service_name}</div>
    </Modal>
  )
}

export default Appointments
