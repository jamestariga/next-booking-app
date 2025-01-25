import Appointments from '@/features/appointments/Appointments'
import { createClient } from '@/supabase/auth/server'
import { Appointment } from '@/features/reservations/types/reservations.types'
import { IBarberProfile } from '@/features/appointments/types/appointments.types'

type Params = Promise<{ id: number }>

const ReservationModal = async ({ params }: { params: Params }) => {
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

  // query the barber's profile
  const { data: barberData } = await supabase
    .from('barbers')
    .select(
      `
      *,
      profiles (id, display_name)
      `
    )
    .eq('id', appointment.barber_id)
    .single<IBarberProfile>()

  if (!barberData) {
    return
  }

  return (
    <Appointments
      type='reservation'
      data={appointment}
      barberData={barberData}
    />
  )
}

export default ReservationModal
