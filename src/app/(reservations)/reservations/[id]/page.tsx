import { createClient } from '@/supabase/auth/server'
import { Appointment } from '@/features/reservations/types/reservations.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime } from '@/lib/utils'
type Params = Promise<{ id: number }>

const ReservationPage = async ({ params }: { params: Params }) => {
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

  // TODO - Add a function that confirms the status of the appointment

  return (
    <div className='max-w-3xl mx-auto space-y-4'>
      <h1 className='text-2xl font-bold'>Reservations</h1>
      <Card>
        <CardHeader>
          <CardTitle>{appointment?.service.service_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{formatDateTime(appointment?.start ?? '')}</p>
          <p>{appointment?.service.price}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReservationPage
