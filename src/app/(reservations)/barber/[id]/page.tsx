import Reservations from '@/features/reservations/Reservations'
import { cachedUser } from '@/lib/cached'
import { createClient } from '@/supabase/auth/server'

type Params = Promise<{ id: number }>

const BarberReservation = async ({ params }: { params: Params }) => {
  const { id } = await params
  const supabase = await createClient()

  // User Cached Data
  const user = await cachedUser()

  // Barber Data
  const { data: barber } = await supabase
    .from('barbers')
    .select(
      `
      *,
      profiles (id, display_name),
      schedule(*),
      services(*)
      `
    )
    .eq('id', id)
    .single()

  if (!user || !barber) {
    return <div>No user or barber data found</div>
  }

  return (
    <div className='max-w-3xl tablet:max-w-(--breakpoint-lg) w-full space-y-4 mx-auto'>
      {user && barber && (
        <Reservations
          userDetails={user}
          barberId={barber.id}
          barberName={barber.profiles.display_name}
          schedule={barber.schedule}
          services={barber.services}
        />
      )}
    </div>
  )
}

export default BarberReservation
