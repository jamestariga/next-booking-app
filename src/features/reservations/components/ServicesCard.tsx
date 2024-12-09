import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type Service = {
  id: number
  barber_id: number
  service_name: string
}

type ServicesCardProps = {
  data: Service
  handleSelection: (service: Service) => void
}

const ServicesCard = ({ data, handleSelection }: ServicesCardProps) => {
  return (
    <Card
      className='w-full min-w-[200px]'
      onClick={() => handleSelection(data)}
    >
      <CardHeader>
        <CardTitle className='text-lg font-bold'>{data.service_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-md font-medium'>ID: {data.id}</p>
      </CardContent>
    </Card>
  )
}

export default ServicesCard
