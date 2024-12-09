'use client'

import { useState } from 'react'
import useGetUserById from '@/hooks/useGetUserById'
import { User } from '@supabase/supabase-js'
import CalendarDateRangePicker from './components/CalendarDateRangePicker'
import ServiceSelection, { Service } from './components/ServiceSelection'

type ReservationsProps = {
  userDetails: User
  barberId: number
  barberName: string
}

const Reservations = ({
  userDetails,
  barberId,
  barberName,
}: ReservationsProps) => {
  const { id } = userDetails
  const userData = useGetUserById(id)

  const [selectedServiceDetails, setSelectedServiceDetails] =
    useState<Service | null>(null)

  const handleServiceSelection = (service: Service | null) => {
    setSelectedServiceDetails(service)
  }

  return (
    <div className={`space-y-6 w-full ${selectedServiceDetails && 'pt-40'}`}>
      <h1 className='font-bold text-xl md:text-2xl'>
        Appointment with {barberName}!
      </h1>
      {!selectedServiceDetails && (
        <ServiceSelection onSelectService={handleServiceSelection} />
      )}
      {selectedServiceDetails && (
        <CalendarDateRangePicker barberId={barberId} userId={userData?.id} />
      )}
    </div>
  )
}

export default Reservations
