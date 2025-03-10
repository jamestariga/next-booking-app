import { notFound } from 'next/navigation'
import Schedule from '@/features/schedule/Schedule'
import { getBarberSchedule } from '@/server-functions/schedule'

type Params = Promise<{ id: number }>

export default async function SchedulePage({ params }: { params: Params }) {
  const { id } = await params

  if (isNaN(id)) {
    notFound()
  }

  try {
    const schedules = await getBarberSchedule(id)

    return (
      <section className='flex flex-col space-y-8 w-full'>
        <div className='max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
          <h1 className='text-3xl font-bold'>Barber Schedule</h1>
          <p className='text-muted-foreground'>
            Manage your weekly working hours. You can add, edit, or remove
            schedules for each day of the week.
          </p>

          <Schedule schedules={schedules} barberId={id} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error fetching schedule:', error)
    return (
      <section className='flex flex-col space-y-8 w-full'>
        <div className='max-w-3xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
          <h1 className='text-3xl font-bold'>Barber Schedule</h1>
          <p className='text-red-500'>
            Failed to load schedule. Please try again later.
          </p>
        </div>
      </section>
    )
  }
}
