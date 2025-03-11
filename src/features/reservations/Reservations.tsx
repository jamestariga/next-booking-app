'use client'

import { useState } from 'react'
import useGetUserById from '@/hooks/useGetUserById'
import { User } from '@supabase/supabase-js'
import CalendarDateRangePicker from './components/CalendarDateRangePicker'
import ServiceSelection from './components/ServiceSelection'
import { Service } from './types/reservations.types'
import { Schedule } from '@/server-functions/schedule'

type ReservationsProps = {
  userDetails: User
  barberId: number
  barberName: string
  schedule: Schedule[]
}

const Reservations = ({
  userDetails,
  barberId,
  barberName,
  schedule,
}: ReservationsProps) => {
  const { id } = userDetails
  const userData = useGetUserById(id)

  const [selectedServiceDetails, setSelectedServiceDetails] =
    useState<Service | null>(null)

  const handleServiceSelection = (service: Service | null) => {
    setSelectedServiceDetails(service)
  }

  return (
    <div className={`space-y-6 w-full ${selectedServiceDetails && 'py-40'}`}>
      <h1 className='font-bold text-xl md:text-2xl'>
        Appointment with {barberName}!
      </h1>
      {!selectedServiceDetails && (
        <ServiceSelection onSelectService={handleServiceSelection} />
      )}
      {selectedServiceDetails && (
        <CalendarDateRangePicker
          barberId={barberId}
          userId={userData?.id}
          service={selectedServiceDetails}
          schedule={schedule}
        />
      )}
    </div>
  )
}

export default Reservations
