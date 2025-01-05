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
    .order('end', {
      referencedTable: 'reservations',
      ascending: false,
    })
    .single<ProfileAndReservations>()

  console.log(profileAndReservations)

  if (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <section
      className={`max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto ${
        profileAndReservations &&
        profileAndReservations.reservations.length > 2 &&
        'py-40'
      }`}
    >
      <h1 className='text-2xl font-bold'>My Reservations</h1>
      {profileAndReservations && (
        <ReservationsList reservations={profileAndReservations.reservations} />
      )}
    </section>
  )
}

export default Reservations
