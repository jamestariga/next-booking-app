import ListView from '@/components/ListView/ListView'
import { Reservation } from './types/reservations.types'
import ReservationsCard from './components/ReservationsCard'

const ReservationsList = ({
  reservations,
}: {
  reservations: Reservation[]
}) => {
  return (
    <ListView
      data={reservations}
      display='flex'
      renderItem={(item) => <ReservationsCard data={item} key={item.id} />}
    />
  )
}

export default ReservationsList
