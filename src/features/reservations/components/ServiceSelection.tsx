import { useState } from 'react'
import ServicesCard from './ServicesCard'
import ScrollView from '@/components/ScrollView/ScrollView'
import ListView from '@/components/ListView/ListView'

export type Service = {
  id: number
  barber_id: number
  service_name: string
}

type ServiceSelectionProps = {
  onSelectService: (service: Service | null) => void
}

// TODO - Replace with real data from the database
const mockServices: Service[] = [
  { id: 1, barber_id: 1, service_name: 'Haircut' },
  { id: 2, barber_id: 1, service_name: 'Beard Trim' },
  { id: 3, barber_id: 2, service_name: 'Haircut' },
  { id: 4, barber_id: 2, service_name: 'Shave' },
]

const ServiceSelection = ({ onSelectService }: ServiceSelectionProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    onSelectService(service)
  }

  console.log(selectedService)

  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-bold'>Select a Service:</h1>
      <ListView
        data={mockServices}
        renderItem={(item) => (
          <ServicesCard
            data={item}
            handleSelection={() => handleServiceSelect(item)}
          />
        )}
      />
    </div>
  )
}

export default ServiceSelection
