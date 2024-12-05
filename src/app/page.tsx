import { createClient } from '@/supabase/auth/server'
import Reservations from '@/features/reservations/Reservations'
import BarberList from '@/features/reservations/BarberList'

const Home = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const { user } = data

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <BarberList />
      {user && <Reservations userDetails={user} />}
    </div>
  )
}

export default Home
