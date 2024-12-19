import { createClient } from '@/supabase/auth/server'
import ListView from '@/components/ListView/ListView'
import { Reservation } from '@/features/reservations/types/reservations.types'
import { format } from 'date-fns'

type ProfileAndReservations = {
  id: number
  reservations: Reservation[]
}

const Reservations = async () => {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id ?? ''

  const { data: profileAndReservations, error } = await supabase
    .from('profiles')
    .select(
      `
        id,
        reservations:reservations(*)
      `
    )
    .eq('user_id', userId)
    .single<ProfileAndReservations>()

  if (error) {
    console.error('Error fetching data:', error)
  }

  console.log(profileAndReservations)

  const formatDateTime = (dateString: string) => {
    // Add 8 hours to convert from PST to UTC display
    const date = new Date(dateString)
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // Add 8 hours
    return format(date, "MMM d, yyyy 'at' h:mm a 'PST'")
  }

  return (
    <div className='mx-auto'>
      <h1>Reservations Page</h1>
      {profileAndReservations && (
        <ListView
          data={profileAndReservations.reservations}
          renderItem={(item) => (
            <div key={item.id}>
              <h2>{item.service.service_name}</h2>
              <p>Start: {formatDateTime(item.start)}</p>
              <p>End: {formatDateTime(item.end)}</p>
              <p>Status: {item.status}</p>
            </div>
          )}
        />
      )}
    </div>
  )
}

export default Reservations
