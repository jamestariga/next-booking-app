import { createClient } from '@/supabase/auth/server'
import AdminTable from '@/features/admin/AdminTable'

const Page = async () => {
  const supabase = await createClient()

  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('*')
    .order('id')

  if (usersError) {
    console.error('Error fetching users:', usersError)
    return <div>Error loading users</div>
  }

  const { data: barbers, error: barbersError } = await supabase
    .from('barbers')
    .select('*')

  if (barbersError) {
    console.error('Error fetching barbers:', barbersError)
    return <div>Error loading barbers</div>
  }

  const usersWithBarberStatus = users.map((user) => ({
    ...user,
    isBarber: barbers.some((barber) => barber.user_id === user.id),
  }))

  return (
    <div className='mx-auto min-w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <AdminTable usersWithBarberStatus={usersWithBarberStatus} />
    </div>
  )
}

export default Page
