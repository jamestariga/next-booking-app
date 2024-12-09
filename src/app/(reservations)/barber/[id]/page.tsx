import Reservations from '@/features/reservations/Reservations'
import { createClient } from '@/supabase/auth/server'

type Params = Promise<{ id: number }>

const BarberReservation = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()

  // User data
  const { data: userData } = await supabase.auth.getUser()
  const { user } = userData

  // Barber data
  const { data: barberData } = await supabase
    .from('barbers')
    .select(
      `
    user_id,
    profiles (id, display_name)
  `
    )
    .eq('user_id', id)
    .single()

  const barber = barberData?.profiles

  return (
    <div className='mx-auto max-w-fit'>
      {user && barber && (
        <Reservations
          userDetails={user}
          barberId={id}
          barberName={barber.display_name}
        />
      )}
    </div>
  )
}

export default BarberReservation
