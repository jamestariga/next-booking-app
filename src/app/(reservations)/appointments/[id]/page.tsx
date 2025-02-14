import { createClient } from '@/supabase/auth/server'
import { Appointment } from '@/features/reservations/types/reservations.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'

type Params = Promise<{ id: number }>

const AppointmentPage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()

  const { data: appointment } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single<Appointment>()

  if (!appointment) {
    return <div>Empty</div>
  }

  console.log(appointment)

  return (
    <div className='max-w-3xl mx-auto space-y-4'>
      <h1 className='text-2xl font-bold'>Appointment</h1>
      <Card>
        <CardHeader>
          <CardTitle>{appointment?.service.service_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{appointment?.user_id}</p>
          <p>{appointment?.barber_id}</p>
          <p>Date and Time: {formatDateTime(appointment?.start ?? '')}</p>
          <p>Price: {appointment?.service.price}</p>
          <div className='flex w-full gap-2 py-4 justify-between'>
            <Button variant='destructive'>Cancel Appointment</Button>
            <Button>Confirm Appointment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AppointmentPage
