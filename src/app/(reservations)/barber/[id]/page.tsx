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
      *,
      profiles (id, display_name),
      schedule(*)
      `
    )
    .eq('id', id)
    .single()

  const barber = barberData?.profiles

  if (!user || !barber) {
    return <div>Loading Page...</div>
  }

  return (
    <div className='mx-auto max-w-fit'>
      {user && barber && (
        <Reservations
          userDetails={user}
          barberId={barberData.id}
          barberName={barber.display_name}
          schedule={barberData.schedule}
        />
      )}
    </div>
  )
}

export default BarberReservation
