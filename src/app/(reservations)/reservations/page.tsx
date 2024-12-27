import { createClient } from '@/supabase/auth/server'
import { ProfileAndReservations } from '@/features/reservations/types/reservations.types'
import ReservationsList from '@/features/reservations/ReservationsList'

const Reservations = async () => {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id ?? ''

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
    .single<ProfileAndReservations>()

  console.log(profileAndReservations)

  if (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <div className='mx-auto'>
      <h1>Reservations Page</h1>
      {profileAndReservations && (
        <ReservationsList reservations={profileAndReservations.reservations} />
      )}
    </div>
  )
}

export default Reservations
