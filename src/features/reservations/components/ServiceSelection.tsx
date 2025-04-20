import ServicesCard from './ServicesCard'
import ListView from '@/components/ListView/ListView'
import { Service } from '@/server-functions/services'

type ServiceSelectionProps = {
  services: Service[]
  onSelectService: (service: Service | null) => void
}

const ServiceSelection = ({
  services,
  onSelectService,
}: ServiceSelectionProps) => {
  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-bold'>Select a Service:</h1>
      <ListView
        data={services}
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
