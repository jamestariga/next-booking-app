import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Service } from '../types/reservations.types'
type ServicesCardProps = {
  data: Service
  handleSelection: (service: Service) => void
}

const ServicesCard = ({ data, handleSelection }: ServicesCardProps) => {
  return (
    <Card
      className='w-full min-w-[200px] p-4 bg-transparent hover:bg-primary hover:scale-[1.1] transition-all duration-300'
      onClick={() => handleSelection(data)}
    >
      <CardHeader>
        <CardTitle className='text-lg font-bold'>{data.service_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-md font-medium'>${data.price}</p>
      </CardContent>
    </Card>
  )
}

export default ServicesCard
