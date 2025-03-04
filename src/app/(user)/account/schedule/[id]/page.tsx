import { createClient } from '@/supabase/auth/server'

type Params = Promise<{ id: number }>

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params

  const supabase = await createClient()
  const { data } = await supabase
    .from('schedule')
    .select('*')
    .eq('barber_id', id)

  const schedule = data ?? []

  return (
    <section className='flex flex-col space-y-8 w-full'>
      <div className='max-w-xl tablet:max-w-screen-lg w-full space-y-4 mx-auto'>
        <h1 className='text-3xl font-bold'>Schedule</h1>
        <p className='text-lg'>{schedule.map((item) => item.day)}</p>
      </div>
    </section>
  )
}

export default Page
