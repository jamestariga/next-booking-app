import { createClient } from '@/supabase/auth/server'
import { ProfileAndReservations } from '@/features/reservations/types/reservations.types'
import ReservationsList from '@/features/reservations/ReservationsList'
import { cachedUser } from '@/lib/cached'

const Reservations = async () => {
  const supabase = await createClient()
  const user = await cachedUser()
  const userId = user?.id

  if (!userId) {
    throw new Error('User not found')
  }

  const { data: profileAndReservations, error } = await supabase
    .from('profiles')
    .select(
      `
      id,
      display_name,
      reservations:reservations(
        *,
        barber:barbers(
          id,
          profile:profiles(
            id,
            display_name
          )
        )
      )
    `
    )
    .eq('user_id', userId)
    .order('end', {
      referencedTable: 'reservations',
      ascending: false,
    })
    .single<ProfileAndReservations>()

  if (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <section className='max-w-3xl tablet:max-w-(--breakpoint-lg) w-full space-y-4 mx-auto'>
      <h1 className='text-2xl font-bold'>My Reservations</h1>
      {profileAndReservations && (
        <ReservationsList reservations={profileAndReservations.reservations} />
      )}
    </section>
  )
}

export default Reservations
