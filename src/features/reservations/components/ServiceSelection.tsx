import ServicesCard from './ServicesCard'
import ListView from '@/components/ListView/ListView'
import { Service } from '../types/reservations.types'

type ServiceSelectionProps = {
  onSelectService: (service: Service | null) => void
}

// TODO - Replace with real data from the database
const mockServices: Service[] = [
  { id: 1, barber_id: 1, service_name: 'Haircut', price: 100 },
  { id: 2, barber_id: 1, service_name: 'Beard Trim', price: 150 },
  { id: 3, barber_id: 2, service_name: 'Haircut', price: 200 },
  { id: 4, barber_id: 2, service_name: 'Shave', price: 250 },
]

const ServiceSelection = ({ onSelectService }: ServiceSelectionProps) => {
  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-bold'>Select a Service:</h1>
      <ListView
        data={mockServices}
        renderItem={(item) => (
          <ServicesCard
            data={item}
            handleSelection={() => onSelectService(item)}
          />
        )}
      />
    </div>
  )
}

export default ServiceSelection
