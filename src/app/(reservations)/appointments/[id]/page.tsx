import { createClient } from '@/supabase/auth/server'
import { Appointment } from '@/features/reservations/types/reservations.types'

type Params = Promise<{ id: number }>

const AppointmentPage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()

  const { data: appointment } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single<Appointment>()

  return <div>Page: {id}</div>
}

export default AppointmentPage
