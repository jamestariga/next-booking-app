import Reservations from '@/features/reservations/Reservations'
import { createClient } from '@/supabase/auth/server'

type Params = Promise<{ id: number }>

const BarberReservation = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const { user } = data

  return <div>{user && <Reservations userDetails={user} barberId={id} />}</div>
}

export default BarberReservation
