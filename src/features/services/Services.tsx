import { Service } from '@/server-functions/services'
import ServicesList from './components/ServiceList'

type ServicesProps = {
  services: Service[]
  barberId: number
}

const Services = ({ services, barberId }: ServicesProps) => {
  return (
    <div className='w-full '>
      <ServicesList services={services} barberId={barberId} />
    </div>
  )
}

export default Services
