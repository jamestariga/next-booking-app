'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Reservation } from '../types/reservations.types'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

type ReservationsCardProps = {
  data: Reservation
}

const ReservationsCard = ({ data }: ReservationsCardProps) => {
  const router = useRouter()

  const formatDateTime = (dateString: string) => {
    // Add 8 hours to convert from PST to UTC display
    const date = new Date(dateString)
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // Add 8 hours
    return format(date, "MMM d, yyyy 'at' h:mm a 'PST'")
  }

  const handleRedirect = (pathName: string) => {
    router.push(pathName, { scroll: false })
  }

  return (
    <Card
      className='w-full min-w-[200px] p-4 bg-transparent hover:text-background dark:hover:text-secondary-foreground hover:bg-primary hover:scale-[1.02] transition-all duration-300'
      onClick={() =>
        handleRedirect(
          `/${data.customer ? 'appointments' : 'reservations'}/${data.id}`
        )
      }
    >
      <CardHeader>
        <CardTitle className='text-lg font-bold'>
          {data.service.service_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-md font-medium'>
          {`${data.barber ? `Barber: ` : `Customer: `}`}
          {data.barber
            ? data.barber.profile.display_name
            : data.customer?.display_name}
        </p>
        <p className='text-md font-medium'>
          Start: {formatDateTime(data.start)}
        </p>
        <p className='text-md font-medium'>End: {formatDateTime(data.end)}</p>
        <p className='text-md font-medium'>${data.service.price}</p>
        <CardDescription>
          <p className='text-md font-medium'>
            View your upcoming reservations and book your next visit.
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default ReservationsCard
