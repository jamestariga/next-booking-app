import ListView from '@/components/ListView/ListView'
import { Reservation } from './types/reservations.types'
import { format } from 'date-fns'

const ReservationsList = ({
  reservations,
}: {
  reservations: Reservation[]
}) => {
  const formatDateTime = (dateString: string) => {
    // Add 8 hours to convert from PST to UTC display
    const date = new Date(dateString)
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // Add 8 hours
    return format(date, "MMM d, yyyy 'at' h:mm a 'PST'")
  }
  return (
    <ListView
      data={reservations}
      renderItem={(item) => (
        <div key={item.id}>
          <h2>{item.service.service_name}</h2>
          <p>Barber: {item.barber.profile.display_name}</p>
          <p>Start: {formatDateTime(item.start)}</p>
          <p>End: {formatDateTime(item.end)}</p>
          <p>Status: {item.status}</p>
        </div>
      )}
    />
  )
}

export default ReservationsList
