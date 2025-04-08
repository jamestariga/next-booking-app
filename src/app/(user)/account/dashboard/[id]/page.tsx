import { notFound } from 'next/navigation'
import Services from '@/features/services/Services'
import { getBarberServices } from '@/server-functions/services'

type Params = Promise<{ id: number }>

const DashboardPage = async ({ params }: { params: Params }) => {
  const { id } = await params

  if (isNaN(id)) {
    notFound()
  }

  const services = await getBarberServices(id)

  return (
    <section className='flex flex-col space-y-8 w-full'>
      <div className='max-w-3xl tablet:max-w-(--breakpoint-lg) w-full space-y-4 mx-auto'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Manage your services. You can add, edit, or remove services.
        </p>
        <Services services={services} barberId={id} />
      </div>
    </section>
  )
}

export default DashboardPage
