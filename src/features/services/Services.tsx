import { Service } from '@/server-functions/services'
import ServicesList from './components/ServiceList'
type ServicesProps = {
  services: Service[]
  barberId: number
}

const Services = ({ services, barberId }: ServicesProps) => {
  return (
    <div className='max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
      <ServicesList services={services} barberId={barberId} />
    </div>
  )
}

export default Services
