import { createClient } from '@/supabase/auth/server'
import { ProfileAndReservations } from '@/features/reservations/types/reservations.types'
import ReservationsList from '@/features/reservations/ReservationsList'

const Appointments = async () => {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id ?? ''

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  const profileId = profile?.id

  if (!profileId) {
    throw new Error('Profile not found')
  }

  const { data: barbersAndAppointments, error } = await supabase
    .from('barbers')
    .select(
      `
      id,
      reservations:reservations(
        *,
        customer:profiles(
          id,
          display_name
        )
      )
    `
    )
    .eq('user_id', profileId)
    .order('end', {
      referencedTable: 'reservations',
      ascending: false,
    })
    .single<ProfileAndReservations>()

  console.log(barbersAndAppointments)

  if (!barbersAndAppointments) {
    return <div>Loading Page...</div>
  }

  if (error || profileError) {
    console.error('Error fetching data:', error || profileError)
  }

  return (
    <section
      className={`max-w-3xl tablet:max-w-(--breakpoint-lg) w-full space-y-4 mx-auto ${
        barbersAndAppointments &&
        barbersAndAppointments.reservations.length > 2 &&
        'py-40'
      }`}
    >
      <h1 className='text-2xl font-bold'>My Appointments</h1>
      {barbersAndAppointments && (
        <ReservationsList reservations={barbersAndAppointments.reservations} />
      )}
    </section>
  )
}

export default Appointments
