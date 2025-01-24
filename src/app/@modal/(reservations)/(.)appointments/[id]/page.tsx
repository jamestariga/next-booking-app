import Appointments from '@/features/appointments/Appointments'
import { createClient } from '@/supabase/auth/server'
import { Appointment } from '@/features/reservations/types/reservations.types'
import { IProfile } from '@/features/appointments/types/appointments.types'

type Params = Promise<{ id: number }>

const AppointmentModal = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()

  const { data: appointment } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single<Appointment>()

  if (!appointment) {
    return <div>Loading Page...</div>
  }

  // query the client's profile
  const { data: clientData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', appointment.user_id)
    .single<IProfile>()

  if (!clientData) {
    return
  }

  return (
    <Appointments
      type='appointment'
      data={appointment}
      clientData={clientData}
    />
  )
}

export default AppointmentModal
